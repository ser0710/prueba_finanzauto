from django.urls import path
from .views import PublicationsView

urlpatterns = [
    path('publicate/', PublicationsView.as_view(), name='publicate')
]