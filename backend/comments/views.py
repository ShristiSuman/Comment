from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Comment
from .serializers import CommentSerializer
from django.utils import timezone

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().order_by('-date')
    serializer_class = CommentSerializer
    
    def create(self, request, *args, **kwargs):
        # Get only the text from the request
        text = request.data.get('text', '')
        
        if not text:
            return Response(
                {'error': 'Text is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create a new comment with fixed values
        comment = Comment.objects.create(
            author='Admin',
            text=text,
            likes=0,
            image=request.data.get('image', '')
        )
        
        # Return the serialized comment
        serializer = self.get_serializer(comment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

    def perform_update(self, serializer):
        # Update the date field with the current time when editing a comment
        serializer.save(date=timezone.now())