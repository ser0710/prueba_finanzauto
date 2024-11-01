from rest_framework.views import APIView
from .serializer import UsersSerializer
from rest_framework.response import Response

# Create your views here.


class UsersView(APIView):
    def post(self, request):
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)