from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PublicationViewSet
from django.urls import path
from .views import PublicationStatsView

router = DefaultRouter()
router.register(r'publications', PublicationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('stats/publications/', PublicationStatsView.as_view(), name='publication-stats'),
]