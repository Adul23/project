from django.shortcuts import render
from rest_framework.generics import RetrieveUpdateAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import CustomUserSerializer, RegisterUserSerializer, LoginUserSerializer
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken

class UserInfoView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user

class UserRegistrationView(CreateAPIView):
    serializer_class = RegisterUserSerializer

class LoginView(APIView):
    def post(self, request):
        serializer = LoginUserSerializer(data=request.data)

        # generating tokens!
        
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken(user)
            access_token = str(refresh.access_token)
            response = Response({
                'user': CustomUserSerializer(user).data
            }, status=status.HTTP_200_OK)
            response.set_cookie(key='access_token', 
                                value=access_token,
                                httponly=True,
                                secure=True,
                                samesite="Strict")
            response.set_cookie(key="refresh_token",
                                value=str(refresh),
                                httponly=True,
                                secure=True,
                                samesite="Strict")
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request):
        response = Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
        
        if response:
            try:
                refresh = RefreshToken(response)
                refresh.blacklist()
            except Exception as e:
                return Response({"error": "Error invalidating token " +str(e)}, status=status.HTTP_400_BAD_REQUEST)
        # deleting access and refresh tokens from cookies
        response = Response({"message": "Successfully logged out!"}, status=status.HTTP_200_OK)
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')

        return response

class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refresh_token")
        
        if not refresh_token:
            return Response({"error": "Refresh is not provided"}, status=status.HTTP_401_UNAUTHORIZED)
        
        try:
            refresh = RefreshToken(refresh_token)
            access_token =str(refresh.acess_token)
            
            response = Response({"message": "Refresh is not provided"}, status=status.HTTP_200_OK)
            response.set_cookie(key='access_token', 
                                value=access_token,
                                httponly=True,
                                secure=True,
                                samesite="Strict")
            return response
        except InvalidToken:
            return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
