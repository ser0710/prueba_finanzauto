from rest_framework import serializers
from .models import Publications

class PublicationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publications
        fields = ['id', 'user', 'title', 'content', 'created_at', 'username']
        extra_kwargs = {
            'user': {'validators': [], 'required': False},
            'username': {'validators': [], 'required': False}

        }