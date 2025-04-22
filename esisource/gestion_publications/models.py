from django.db import models

# Create your models here.
# models.py
from django.db import models
from django.contrib.auth.models import User
import mimetypes

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
    auteur = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True, related_name="publications")
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='brouillon')
    date_creation = models.DateTimeField(auto_now_add=True)
    date_validation = models.DateTimeField(null=True, blank=True)
    validateur = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='publications_validees')

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
