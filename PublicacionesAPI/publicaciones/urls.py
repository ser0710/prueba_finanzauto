from django.urls import path
from .views import PublicationsView, AllPublicationsView

urlpatterns = [
    path('publicate/', PublicationsView.as_view(), name='publicate'),
    path('publication/<int:pk>/', PublicationsView.as_view(), name='list_publications'),
    path('publications/', AllPublicationsView.as_view(), name='all_publications')
]