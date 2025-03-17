# Comment Portal
A full-stack comment system application with React frontend and Django REST Framework backend. This application provides an intuitive interface for managing comments, featuring a modern UI built with Material UI components. The design is fully responsive, ensuring a smooth experience across all screen sizes.


## Key Features
- View Comments: Display all comments with author information, text, date, likes, and images.
- Add Comments: "Admin" users can add new comments.
- Edit Comments: Edit existing comments with a proper save/cancel workflow.
- Delete Comments: Delete comments with a confirmation prompt.
- Avatar Generation: Color avatars are automatically generated for users without profile images.
- UI Design: Clean typography and consistent spacing for a polished look and feel.


## Requirements

- Python 3.8+
- Node.js 14+
- PostgreSQL


## Backend Setup

1. Set up a virtual environment:
``` bash
cd backend
python -m venv venv
source venv/bin/activate
```

2. Install dependencies:
``` bash
pip install django djangorestframework django-cors-headers
```

3. Apply migrations:
``` bash
python manage.py makemigrations
python manage.py migrate
```

4. Load initial data:
``` bash
python load_data.py
```

5. Run the server:
```
python manage.py runserver
```


The backend API will be available at http://localhost:8000/api/comments/


## Frontend Setup

1. Install dependencies:
``` bash
cd frontend
npm install
```


2. Run the development server:
``` bash
npm run dev
```

The frontend application will be available at http://localhost:5173


## API Endpoints

- `GET /api/comments/` - List all comments
- `POST /api/comments/` - Create a new comment
- `GET /api/comments/{id}/` - Retrieve a comment
- `PUT /api/comments/{id}/` - Update a comment
- `DELETE /api/comments/{id}/` - Delete a comment


## Time Constraints Note
Given more time, I would add the following enhancements:

- Authentication system with user roles (admin vs regular users)
- Pagination for comments to handle large datasets
- Like/unlike functionality
- Comment replies and threading
- Search and filtering capabilities
- Form validation with better error handling
- Docker containerization for easier setup