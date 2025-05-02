# serializers.py
from rest_framework import serializers
from .models import Publication, Medias, Commentaire, Notification

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


class CommentaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commentaire
        fields = ['id', 'contenu', 'date_commentaire', 'auteur', 'publication']
        read_only_fields = ['auteur', 'date_commentaire', 'publication']


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'utilisateur', 'publication', 'contenu', 'date_notification', 'lu']
