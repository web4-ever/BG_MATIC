from django.urls import path
from . import views

urlpatterns = [
    path('', views.TagList.as_view(), name='tag_list'),
]
