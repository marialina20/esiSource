from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PublicationViewSet, MediasViewSet

router = DefaultRouter()
router.register(r'publications', PublicationViewSet)
router.register(r'medias', MediasViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
