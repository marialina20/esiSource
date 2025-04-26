# models.py
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import mimetypes


class Publication(models.Model):
    TYPE_CHOICES = [
        ('siteWeb', 'Site Web'),
        ('pageFacebook', 'Page Facebook'),
    ]
    
    STATUT_CHOICES = [
        ('brouillon', 'Brouillon'),
        ('en_attente', 'En attente'),
        ('valide', 'Validé'),
        ('refuse', 'Refusé'),
        ('publie', 'Publié'),
    ]
    
    id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='siteWeb')
    contenu = models.TextField(default='')
    auteur_id = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name="publications",
        null=True,  # Allow null for cases where user might not be available
        default=None
    )
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='brouillon')
    date_planifiee = models.DateTimeField(default=timezone.now)  # Default to current time
    date_validation = models.DateTimeField(null=True, blank=True, default=None)
    validateur_id = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='publications_validees',
        default=None
    )
    
    def __str__(self):
        return f"{self.get_type_display()} - {self.statut}"

class Medias(models.Model):
    id = models.AutoField(primary_key=True)
    publication_id = models.ForeignKey(
        Publication, 
        on_delete=models.CASCADE, 
        related_name='medias'
    )
    type = models.CharField(max_length=50, default='unknown', blank=True)
    url = models.FileField(upload_to='medias/')
    date_ajout = models.DateTimeField(default=timezone.now)
    
    def save(self, *args, **kwargs):
        if self.url:
            mime_type, _ = mimetypes.guess_type(self.url.name)
            if mime_type:
                self.type = mime_type.split('/')[0]  # This will extract 'image', 'video', etc.
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.type} - {self.publication_id}"