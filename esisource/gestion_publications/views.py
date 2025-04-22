from rest_framework import viewsets
from .models import Publication, Medias
from .serializers import PublicationSerializer, MediaSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
       

class PublicationViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour créer, récupérer, mettre à jour et supprimer des publications.
    """
    queryset = Publication.objects.all().order_by('-date_creation')
    serializer_class = PublicationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        User = get_user_model()
        auteur = User.objects.get(id=1)
        serializer.save(auteur=auteur)



class MediasViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour gérer les fichiers médias liés à une publication.
    """
    queryset = Medias.objects.all().order_by('-type')
    serializer_class = MediaSerializer
