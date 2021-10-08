from rest_framework import generics, filters
from .serializers import ImageSerializer
from django.http import JsonResponse
from .models import Image
from django_filters.rest_framework import DjangoFilterBackend

class ImageList(generics.ListAPIView):
    # Get all posts, limit = 20
    queryset = Image.objects.order_by('-created_at')
    serializer_class = ImageSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['tag']
    search_fields = ['name', 'description']

class ImageDetail(generics.RetrieveAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
