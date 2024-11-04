from rest_framework.views import APIView
from .serializer import PublicationsSerializer
from rest_framework import status
from .utils import get_user_data
from rest_framework.response import Response
from .models import Publications

class PublicationsView(APIView):   

    def post(self, request):
        token = request.headers.get('Token')
        user_data = get_user_data(token)
        if user_data:
            serializer = PublicationsSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=user_data['id'])
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Error con el token de usuario"}, status=status.HTTP_401_UNAUTHORIZED)
        
    def get(self, request, pk):
        token = request.headers.get('Token')
        user_data = get_user_data(token)
        if user_data:
            publications = Publications.objects.filter(user=pk)
            serializer = PublicationsSerializer(publications, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"error": "Error con el token de usuario"}, status=status.HTTP_401_UNAUTHORIZED)
    
    def delete(self, request, pk):
        token = request.headers.get('Token')
        user_data = get_user_data(token)
        if user_data:
            publication = Publications.objects.get(pk=pk)
            publication.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "Error con el token de usuario"}, status=status.HTTP_401_UNAUTHORIZED)
