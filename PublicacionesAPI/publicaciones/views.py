from rest_framework.views import APIView
from .serializer import PublicationsSerializer
from rest_framework import status
from .utils import get_user_data
from rest_framework.response import Response

class PublicationsView(APIView):   

    def post(self, request):
        token = request.data['token']
        user_data = get_user_data(token)
        print(user_data)
        if user_data:
            serializer = PublicationsSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=user_data['id'])
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Error con el token de usuario"}, status=status.HTTP_401_UNAUTHORIZED)
