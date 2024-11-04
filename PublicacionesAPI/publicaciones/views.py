from rest_framework.views import APIView
from .serializer import PublicationsSerializer
from rest_framework import status
from .utils import get_user_data
from rest_framework.response import Response
from .models import Publications
from rest_framework.pagination import PageNumberPagination

class Pagination(PageNumberPagination):
    page_size = 2

class PublicationsView(APIView):   

    def post(self, request):
        token = request.headers.get('Token')
        user_data = get_user_data(token)
        if user_data:
            serializer = PublicationsSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=user_data['id'], username=user_data['username'])
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Error con el token de usuario"}, status=status.HTTP_401_UNAUTHORIZED)
        
    def get(self, request, pk):
        token = request.headers.get('Token')
        user_data = get_user_data(token)
        if user_data:
            publications = Publications.objects.filter(user=pk)
            paginator = Pagination()
            pagi_publi = paginator.paginate_queryset(publications, request)
            serializer = PublicationsSerializer(pagi_publi, many=True)
            return paginator.get_paginated_response(serializer.data)
        return Response({"error": "Error con el token de usuario"}, status=status.HTTP_401_UNAUTHORIZED)
    
    def delete(self, request, pk):
        token = request.headers.get('Token')
        user_data = get_user_data(token)
        if user_data:
            publication = Publications.objects.get(pk=pk)
            publication.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "Error con el token de usuario"}, status=status.HTTP_401_UNAUTHORIZED)
    

class AllPublicationsView(APIView):
    def get(self, request):
        publications = Publications.objects.all()
        paginator = Pagination()
        pagi_publi = paginator.paginate_queryset(publications, request)
        serializer = PublicationsSerializer(pagi_publi, many=True)
        return paginator.get_paginated_response(serializer.data)
