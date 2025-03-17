const API_URL = 'http://localhost:8000/api';

// Getting the comments
export const fetchComments = async () => {
  const response = await fetch(`${API_URL}/comments/`);
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  return response.json();
};

// Posting a new comment
export const createComment = async (commentData) => {

  console.log('Creating comment with data:', commentData);

  const response = await fetch(`${API_URL}/comments/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentData),
  });

  if (!response.ok) {
    let errorMessage = 'Failed to create comment';
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch (e) {
    }
    throw new Error(errorMessage);
  }
  return response.json();
  };


// Editing the comment
export const updateComment = async (id, commentData) => {
const response = await fetch(`${API_URL}/comments/${id}/`, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentData),
});
if (!response.ok) {
    throw new Error('Failed to update comment');
}
return response.json();
};


// Deleting the comment
export const deleteComment = async (id) => {
const response = await fetch(`${API_URL}/comments/${id}/`, {
    method: 'DELETE',
});
if (!response.ok) {
    throw new Error('Failed to delete comment');
}
return true;
};
