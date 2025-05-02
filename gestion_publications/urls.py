from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PublicationViewSet, MediasViewSet, ajouter_commentaire, valider_publication, get_notifications, marquer_notification_lue

router = DefaultRouter()
router.register(r'publications', PublicationViewSet)
router.register(r'medias', MediasViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('publications/<int:publication_id>/valider/<int:user_id>/', valider_publication, name='valider_publication'),
    path('notifications/<int:user_id>/', get_notifications, name='get_notifications'),
    path('notifications/<int:notification_id>/lue/<int:user_id>/', marquer_notification_lue, name='marquer_notification_lue'),
]
