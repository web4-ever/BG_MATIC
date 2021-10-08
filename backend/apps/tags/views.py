from rest_framework import generics
from .serializers import TagSerializer
from django.http import JsonResponse
from .models import Tag
from .paginations import NoLimitedResultPagination


class TagList(generics.ListAPIView):
    # Get all posts, limit = 20
    queryset = Tag.objects.order_by('created_at').reverse().all()[:20]
    serializer_class = TagSerializer
    pagination_class = NoLimitedResultPagination

