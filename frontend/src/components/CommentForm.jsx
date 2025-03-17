import React, { useState } from 'react';
import { createComment } from '../services/api';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Stack,
  Paper,
  InputAdornment,
  alpha
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import CommentIcon from '@mui/icons-material/Comment';

// Adding new comments
const CommentForm = ({ refreshComments }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Comment text is required');
      return;
    }

    setIsSubmitting(true);
    setError('');

      try {
        await createComment({
          // Default author is Admin
          author: 'Admin', 
          text,
          likes: 0,
          image: image || '',
        });

      // Clear form after successful submission
      setText('');
      setImage('');
      
      // Refresh the comments list
      refreshComments();
    } catch (error) {
      console.error('Failed to add comment:', error);
      setError('Failed to add comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (

    <Box component="form" onSubmit={handleSubmit}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 3,
      }}>

        <CommentIcon 
          color="primary" 
          sx={{ 
            fontSize: 32, 
            mr: 2,
            backgroundColor: alpha('#6200ea', 0.1),
            padding: 1,
            borderRadius: '50%',
          }} 
        />

        <Typography 
          variant="h2" 
          component="h2" 
          sx={{
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: 0,
              width: 60,
              height: 4,
              backgroundColor: 'primary.main',
              borderRadius: 2,
            }
          }}
        >
          Add a Comment
        </Typography>

      </Box>
      
      <Stack spacing={3}>

        <TextField
          label="Write your comment"
          multiline
          minRows={4}
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          variant="outlined"
          placeholder="What's on your mind?"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white',
              borderRadius: 2,
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderWidth: 2,
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'primary.main',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CommentIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        
        <TextField
          label="Image URL (optional)"
          fullWidth
          value={image}
          onChange={(e) => setImage(e.target.value)}
          variant="outlined"
          placeholder="https://example.com/image.jpg"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'white',
              borderRadius: 2,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ImageIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={isSubmitting || !text.trim()}
            endIcon={<SendIcon />}
            sx={{
              background: 'linear-gradient(45deg, #6200ea 0%, #9d46ff 100%)',
              px: 4,
              py: 1.2,
              boxShadow: '0 8px 16px rgba(98, 0, 234, 0.3)',
              '&:hover': {
                boxShadow: '0 12px 20px rgba(98, 0, 234, 0.4)',
              },
            }}
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default CommentForm;