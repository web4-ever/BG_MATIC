from django.db import models
from cloudinary.models import CloudinaryField
from apps.tags.models import Tag


class Image(models.Model):
    class Meta(object):
        db_table = 'image'

    name = models.CharField(
        'Name', blank=False, null=False, max_length=14, db_index=True
    )
    description= models.CharField(
        'description', blank=True, null=True, max_length=140, db_index=True
    )
    image = CloudinaryField('image', blank=True, null=True)
    tag = models.ManyToManyField(
        Tag
    )
    created_at = models.DateTimeField(
        'Created Datetime', blank=True, auto_now_add=True
    )
    updated_at = models.DateTimeField(
        'Updated Datetime', blank=True, auto_now=True
    )