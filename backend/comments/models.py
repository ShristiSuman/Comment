from django.db import models
from django.utils import timezone

# Create your models here.
class Comment(models.Model):
    author = models.CharField(max_length=100)
    text = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    likes = models.IntegerField(default=0)
    image = models.URLField(blank=True)
    
    def __str__(self):
        return f"{self.author}: {self.text[:50]}"