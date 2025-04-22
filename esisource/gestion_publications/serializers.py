# serializers.py
from rest_framework import serializers
from .models import Publication, Medias

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medias
        fields = ['id','url', 'publication']

class PublicationSerializer(serializers.ModelSerializer):
    medias = MediaSerializer(many=True, read_only=True)

    class Meta:
        model = Publication
        fields = [
            'id', 'titre', 'contenu', 'statut',
            'date_creation', 'date_validation',
            'medias'
        ]
