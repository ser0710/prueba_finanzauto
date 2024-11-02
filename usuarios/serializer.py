from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Users
import re

class UsersSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Users
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password']
        extra_kwargs = {
            'email' : {'validators' : []},
            'username' : {'validators' : []}
        }

    def validate_email(self, value):
        if Users.objects.filter(email=value).exists():
            raise serializers.ValidationError("Correo ya en uso.")
        return value
    
    def validate_username(self, value):
        if Users.objects.filter(username=value).exists():
            raise serializers.ValidationError("Un usuario con este nombre de usuario ya existe.")
        return value
    
    def validate_password(self, value):
        errors = []
        if len(value) < 8:
            errors.append("Contraseña demasiado corta.")
        if not re.search(r"[A-Z]", value):
            errors.append("La contraseña debe tener al menos una letra mayúscula.")
        if not re.search(r"[0-9]", value):
            errors.append("La contraseña debe tener al menos un número")
        if len(errors) > 0:
            raise serializers.ValidationError("Existen los siguientes errores con la contraseña: " + ", ".join(errors))
        return value


    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        user = Users.objects.create(**validated_data)
        return user