import json
import os
import django
from datetime import datetime
import pytz

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'comment_api.settings')
django.setup()

from comments.models import Comment

def load_data():
    # Clear existing data
    Comment.objects.all().delete()
    
    # Load from JSON file
    with open('comments_data.json', 'r') as file:
        data = json.load(file)
        
    for comment_data in data['comments']:
        # Parse the date string into a datetime object
        date_str = comment_data['date']
        date_obj = datetime.strptime(date_str, '%Y-%m-%dT%H:%M:%SZ')
        date_obj = pytz.utc.localize(date_obj)
        
        Comment.objects.create(
            id=comment_data['id'],
            author=comment_data['author'],
            text=comment_data['text'],
            date=date_obj,
            likes=comment_data['likes'],
            image=comment_data['image']
        )
    
    print(f"Loaded {Comment.objects.count()} comments successfully.")

if __name__ == "__main__":
    load_data()