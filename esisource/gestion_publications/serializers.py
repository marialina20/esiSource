# serializers.py
from rest_framework import serializers
from .models import Publication, Medias
from django.utils import timezone

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medias
        fields = ['id', 'type', 'url', 'date_ajout']
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Ensure the URL is a complete URL rather than just a relative path
        if representation['url'] and not representation['url'].startswith(('http://', 'https://')):
            request = self.context.get('request', None)
            if request is not None:
                representation['url'] = request.build_absolute_uri(representation['url'])
        return representation

class PublicationSerializer(serializers.ModelSerializer):
    medias = MediaSerializer(many=True, read_only=True)
    upload_medias = serializers.ListField(
        child=serializers.FileField(max_length=100000, allow_empty_file=False, use_url=False),
        write_only=True,
        required=False,
        default=[]
    )
    
    class Meta:
        model = Publication
        fields = [
            'id', 'type', 'contenu', 'statut',
            'date_planifiee', 'date_validation',
            'auteur_id', 'validateur_id', 'medias', 'upload_medias'
        ]
    
    def create(self, validated_data):
        upload_medias = validated_data.pop('upload_medias', [])
        
        # Apply defaults if not provided
        if 'date_planifiee' not in validated_data or validated_data['date_planifiee'] is None:
            validated_data['date_planifiee'] = timezone.now()
            
        if 'statut' not in validated_data:
            validated_data['statut'] = 'brouillon'
            
        publication = Publication.objects.create(**validated_data)
        
        for media_file in upload_medias:
            Medias.objects.create(
                publication_id=publication, 
                url=media_file,
                date_ajout=timezone.now()
            )
        
        return publication
    def update(self, instance, validated_data):
        upload_medias = validated_data.pop('upload_medias', [])
        
        # Mettre à jour les champs de la publication
        instance.type = validated_data.get('type', instance.type)
        instance.contenu = validated_data.get('contenu', instance.contenu)
        instance.statut = validated_data.get('statut', instance.statut)
        instance.date_planifiee = validated_data.get('date_planifiee', instance.date_planifiee)
        
        # Si le statut change à 'valide', enregistrer la date de validation et le validateur
        if validated_data.get('statut') == 'valide' and instance.statut != 'valide':
            instance.date_validation = timezone.now()
            instance.validateur_id = validated_data.get('validateur_id', instance.validateur_id)
        
        instance.save()
        
        # Ajouter les nouveaux médias
        for media_file in upload_medias:
            Medias.objects.create(
                publication_id=instance, 
                url=media_file,
                date_ajout=timezone.now()
            )
        
        return instance