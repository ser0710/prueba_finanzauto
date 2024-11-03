from rest_framework.views import APIView
from .serializer import UsersSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Users
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

# Create your views here.


class UsersView(APIView):
    def post(self, request):
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": request.data.get("username"),
                "message" : "Usuario creado",
                "refresh" : str(refresh),
                "access": str(refresh.access_token)
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserData(APIView):
    permission_classes = [IsAuthenticated]    
    def get(self, request):
        user = request.user
        serializer = UsersSerializer(user)
        return Response(serializer.data)

class LoginUsersView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                "user": username,
                "message": "inicio de sesión",
                "refresh": str(refresh),
                "access": str(refresh.access_token)
            }, status=status.HTTP_200_OK)
        return Response({
            "error": "Credenciales no validas"
        }, status=status.HTTP_401_UNAUTHORIZED)
    
class UpdateUserView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        print(request.data)
        user = request.user
        serializer = UsersSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Información actualizada"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class UsersSettings(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = Users.objects.all()
        serializer = UsersSerializer(users, many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    
    def delete(self, request, pk):
        user = Users.objects.get(pk=pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)