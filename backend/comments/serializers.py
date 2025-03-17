from rest_framework import serializers
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'author', 'text', 'date', 'likes', 'image']
        read_only_fields = ['id']

    def create(self, validated_data):
        return Comment.objects.create(**validated_data)