from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Users
import re

class UsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password']
        extra_kwargs = {
            'username' : {'validators' : [], 'required': False, 'allow_blank': True},
            'email': {'validators': [], 'required': False, 'allow_blank': True},
            'password': {'validators': [], 'required': False, 'allow_blank': True},
        }

    def validate(self, value):
        errors = {}
        email = value.get('email')
        username = value.get('username')
        password = value.get('password')
        if email is None or email == "":
            errors["email"] = "El correo no puede ser nulo."
        if username is None or username == "":
            errors["username"] = "El nombre de usuario no puede ser nulo."
        if password is None or password == "":
            errors["password"] = "La contraseña no puede ser nula."
        if errors:
            raise serializers.ValidationError(errors)
        return value

    def validate_email(self, value):
        if value and Users.objects.filter(email=value).exists():
            raise serializers.ValidationError("Correo ya en uso.")
        return value
    
    def validate_username(self, value):
        if value and Users.objects.filter(username=value).exists():
            raise serializers.ValidationError("Un usuario con este nombre de usuario ya existe.")
        return value
    
    def validate_password(self, value):
        if value:
            errors = []
            ob = {}
            if len(value) < 8:
                errors.append("Contraseña es demasiado corta.")
            if not re.search(r"[A-Z]", value):
                errors.append("La contraseña debe tener al menos una letra mayúscula.")
            if not re.search(r"[0-9]", value):
                errors.append("La contraseña debe tener al menos un número")
            if len(errors) > 0:
                ob["errors"] = errors 
                raise serializers.ValidationError(ob)
        return value


    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        user = Users.objects.create(**validated_data)
        return user
    
    def update(self, instance, validated_data):
        new_password = validated_data.get('password', None)
        if new_password:
            instance.password = make_password(new_password)
        instance.save()
        return instance