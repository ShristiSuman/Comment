import React, { useState } from 'react';
import { updateComment, deleteComment } from '../services/api';

import { 
    Box, 
    Typography, 
    Avatar, 
    TextField, 
    Button, 
    Grid,
    Chip,
    IconButton,
    Paper,
    alpha
  } from '@mui/material';
import { 
Edit as EditIcon, 
Delete as DeleteIcon,
Favorite as FavoriteIcon,
Save as SaveIcon,
Cancel as CancelIcon,
AccessTime as TimeIcon
} from '@mui/icons-material';


const Comment = ({ comment, refreshComments }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment.text);
  const [isDeleting, setIsDeleting] = useState(false);
  const [originalText, setOriginalText] = useState(comment.text);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const handleEditClick = () => {
    // Store the original text when entering edit mode
    setOriginalText(comment.text);
    setText(comment.text);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    // Restore original text and exit edit mode
    setText(originalText);
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    try {
      await updateComment(comment.id, {...comment, text});
      setIsEditing(false);
      refreshComments();
    } catch (error) {
      console.error('Failed to update comment:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      setIsDeleting(true);
      try {
        await deleteComment(comment.id);
        refreshComments();
      } catch (error) {
        console.error('Failed to delete comment:', error);
        setIsDeleting(false);
      }
    }
  };

  // Use generic avatar if no image provided
  const authorInitial = comment.author ? comment.author.charAt(0).toUpperCase() : 'U';

  return (

    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        borderRadius: 3, 
        mb: 2,
        backgroundColor: alpha('#f8f9ff', 0.7),
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: '#ffffff',
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
        }
      }}
    >
      
      {/* Author Avatar */}
      <Grid container spacing={3}>
        <Grid item>
          {comment.image ? (
            <Avatar 
              src={comment.image} 
              alt={comment.author}
              sx={{ 
                width: 60, 
                height: 60,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                border: '3px solid white',
              }}
            />
          ) : (
            <Avatar 
              sx={{ 
                width: 60, 
                height: 60, 
                bgcolor: stringToColor(comment.author),
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                border: '3px solid white',
                fontSize: '1.5rem',
                fontWeight: 'bold',
              }}
            >
              {authorInitial}
            </Avatar>
          )}
        </Grid>
        
        {/* Comments */}
        <Grid item xs>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, flexWrap: 'wrap' }}>
            <Typography 
              variant="h3" 
              component="h3" 
              sx={{ 
                fontWeight: 'bold',
                color: 'primary.dark',
              }}
            >
              {comment.author}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                color: 'text.secondary',
                fontSize: '0.875rem',
              }}>
                <TimeIcon sx={{ fontSize: '1rem', mr: 0.5, color: 'text.secondary' }} />
                {formatDate(comment.date)}
              </Box>
              
              <Chip 
                icon={<FavoriteIcon sx={{ color: '#ff3d71' }} fontSize="small" />} 
                label={comment.likes} 
                size="small"
                variant="filled"
                sx={{
                  background: 'linear-gradient(45deg, #ff3d71 0%, #ff8a9b 100%)',
                  color: 'white',
                  fontWeight: 'bold',
                  '& .MuiChip-icon': { color: 'white !important' }
                }}
              />
            </Box>
          </Box>
          
          {isEditing ? (
            <TextField
              fullWidth
              multiline
              minRows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              variant="outlined"
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  borderRadius: 2,
                }
              }}
            />
          ) : (
            <Typography 
              variant="body1" 
              sx={{ 
                my: 2, 
                px: 2,
                py: 2,
                backgroundColor: alpha('#ffffff', 0.7),
                borderRadius: 2,
                borderLeft: '4px solid',
                borderColor: 'primary.light',
              }}
            >
              {comment.text}
            </Typography>
          )}
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            {isEditing ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveEdit}
                  sx={{ 
                    boxShadow: '0 4px 12px rgba(98, 0, 234, 0.2)',
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<CancelIcon />}
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={handleEditClick}
                  disabled={isDeleting}
                  sx={{
                    color: 'primary.main',
                    borderColor: 'primary.main',
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={handleDelete}
                  disabled={isDeleting || isEditing}
                  sx={{
                    color: 'error.main',
                    borderColor: 'error.main',
                  }}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

// Helper function to generate consistent colors from strings
const stringToColor = (string) => {
  if (!string) return '#757575';
  
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Generate more vibrant colors
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
};

export default Comment;