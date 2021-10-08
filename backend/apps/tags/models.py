from django.db import models

class Tag(models.Model):
    class Meta(object):
        db_table = 'tag'
    
    name = models.CharField(
        'Name', blank=False, null=False, max_length=20, db_index=True
    )
    created_at = models.DateTimeField(
        'Created Datetime', blank=True, auto_now_add=True
    )
    updated_at = models.DateTimeField(
        'Updated Datetime', blank=True, auto_now=True
    )

    