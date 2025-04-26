from rest_framework import viewsets
from .models import Publication, Medias, Commentaire, Notification
from .serializers import PublicationSerializer, MediaSerializer, CommentaireSerializer, NotificationSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response


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



@api_view(['POST'])
def ajouter_commentaire(request, publication_id, user_id):
    try:
        publication = Publication.objects.get(id=publication_id)
        User = get_user_model()
        auteur = User.objects.get(id=user_id)
    except Publication.DoesNotExist:
        return Response({'error': 'Publication non trouvée'}, status=status.HTTP_404_NOT_FOUND)
    except User.DoesNotExist:
        return Response({'error': 'Utilisateur non trouvé'}, status=status.HTTP_404_NOT_FOUND)

    serializer = CommentaireSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(
            auteur=auteur,
            publication=publication
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def valider_publication(request, publication_id, user_id):
    try:
        publication = Publication.objects.get(id=publication_id)
        User = get_user_model()
        validateur = User.objects.get(id=user_id)
    except Publication.DoesNotExist:
        return Response({'error': 'Publication non trouvée'}, status=status.HTTP_404_NOT_FOUND)
    except User.DoesNotExist:
        return Response({'error': 'Utilisateur non trouvé'}, status=status.HTTP_404_NOT_FOUND)

    # Vérifier les données reçues
    if 'statut' not in request.data:
        return Response({'error': 'Le statut est requis'}, status=status.HTTP_400_BAD_REQUEST)
    
    statut = request.data['statut']
    commentaire = request.data.get('commentaire', '')
    date_publication = request.data.get('date_publication', None)

    # Vérifier le statut
    if statut not in ['accepter', 'refuser']:
        return Response({'error': 'Le statut doit être "accepter" ou "refuser"'}, 
                       status=status.HTTP_400_BAD_REQUEST)

    # Créer le commentaire
    commentaire_data = {'contenu': commentaire}
    commentaire_serializer = CommentaireSerializer(data=commentaire_data)
    if commentaire_serializer.is_valid():
        commentaire_serializer.save(
            auteur=validateur,
            publication=publication
        )

    # Mettre à jour la publication
    publication.statut = 'valide' if statut == 'accepter' else 'refuse'
    
    # Ajouter la date de validation uniquement si l'article est accepté
    if statut == 'accepter' and date_publication:
        from django.utils.dateparse import parse_datetime
        from django.utils.timezone import make_aware
        date_validation = parse_datetime(date_publication + "T00:00:00")
        if date_validation:
            publication.date_validation = make_aware(date_validation)
    
    publication.validateur = validateur
    publication.save()

    # Créer une notification pour l'auteur de la publication
    message = f"Votre publication '{publication.titre}' a été {'acceptée' if statut == 'accepter' else 'refusée'}"
    if commentaire:
        message += f" avec le commentaire : {commentaire}"
    
    notification = Notification.objects.create(
        utilisateur=publication.auteur,
        publication=publication,
        contenu=message
    )

    return Response({
        'message': 'Publication validée avec succès',
        'statut': publication.statut,
        'commentaire': commentaire_serializer.data if commentaire else None,
        'date_validation': publication.date_validation.isoformat() if publication.date_validation else None,
        'notification': NotificationSerializer(notification).data
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_notifications(request, user_id):
    try:
        User = get_user_model()
        utilisateur = User.objects.get(id=user_id)
        notifications = Notification.objects.filter(utilisateur=utilisateur).order_by('-date_notification')
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({'error': 'Utilisateur non trouvé'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def marquer_notification_lue(request, notification_id, user_id):
    try:
        User = get_user_model()
        utilisateur = User.objects.get(id=user_id)
        notification = Notification.objects.get(id=notification_id, utilisateur=utilisateur)
        notification.lu = True
        notification.save()
        return Response({'message': 'Notification marquée comme lue'})
    except User.DoesNotExist:
        return Response({'error': 'Utilisateur non trouvé'}, status=status.HTTP_404_NOT_FOUND)
    except Notification.DoesNotExist:
        return Response({'error': 'Notification non trouvée'}, status=status.HTTP_404_NOT_FOUND)
