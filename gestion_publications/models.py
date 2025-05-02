from django.db import models
from django.conf import settings

class Publication(models.Model):
    STATUT_CHOICES = [
        ('brouillon', 'Brouillon'),
        ('en_attente', 'En attente'),
        ('valide', 'Validé'),
        ('refuse', 'Refusé'),
        ('publie', 'Publié'),
    ]

    titre = models.CharField(max_length=255)
    contenu = models.TextField()
    auteur = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True, related_name="publications")
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='brouillon')
    date_creation = models.DateTimeField(auto_now_add=True)
    date_validation = models.DateTimeField(null=True, blank=True)
    validateur = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='publications_validees')

    def __str__(self):
        return self.titre




class Medias(models.Model):
    type = models.CharField(max_length=50, blank=True)
    url = models.FileField(upload_to='medias/')
    publication = models.ForeignKey('Publication', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.url:
            mime_type, _ = mimetypes.guess_type(self.url.name)
            if mime_type:
                main_type = mime_type.split('/')[0]
                self.type = main_type  #  'image', 'video', 'application'
        super().save(*args, **kwargs)


class Historique(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    action = models.CharField(max_length=255)
    date_action = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.action} - {self.date_action}"

class Statistique(models.Model):
    date = models.DateField()
    nombre_publications = models.IntegerField(default=0)
    nombre_publications_refus = models.IntegerField(default=0)
    nombre_refus = models.IntegerField(default=0)

    def __str__(self):
        return f"Stats du {self.date}"

class Commentaire(models.Model):
    publication = models.ForeignKey('Publication', on_delete=models.CASCADE, related_name='commentaires')
    auteur = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    contenu = models.TextField()
    date_commentaire = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Commentaire de {self.auteur.username} sur {self.publication.titre}'


class Notification(models.Model):
    utilisateur = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    publication = models.ForeignKey('Publication', on_delete=models.CASCADE)
    contenu = models.TextField()
    date_notification = models.DateTimeField(auto_now_add=True)
    lu = models.BooleanField(default=False)

    def __str__(self):
        return f'Notification pour {self.utilisateur.username} - {self.publication.titre}'
