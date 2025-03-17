from django.db import connection
from comments.models import Comment

def reset_sequence():
    # Get the highest existing ID
    max_id = Comment.objects.all().order_by('-id').first()
    
    if max_id:
        # Set the sequence to start after the highest ID
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT setval('comments_comment_id_seq', %s, true)", 
                [max_id.id]
            )
            print(f"Sequence reset to start after ID {max_id.id}")
    else:
        print("No comments found")

# Run the function
reset_sequence()