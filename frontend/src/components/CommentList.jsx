import React from 'react';
import Comment from './Comment';
import { Typography, Box, Divider, Fade, alpha } from '@mui/material';

// Comments with Count
const CommentList = ({ comments, refreshComments }) => {
  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        mb: 3,
      }}>
        <Typography 
          variant="h2" 
          component="h2" 
          sx={{
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -10,
              left: 0,
              width: 60,
              height: 4,
              backgroundColor: 'primary.main',
              borderRadius: 2,
            }
          }}
        >
          Comments
        </Typography>
        <Typography 
          variant="h5" 
          component="span"
          sx={{
            color: 'primary.main',
            bgcolor: alpha('#6200ea', 0.1),
            px: 2,
            py: 0.5,
            borderRadius: 4,
            fontWeight: 'bold',
          }}
        >
          {comments.length}
        </Typography>
      </Box>
      
      {comments.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center',
          py: 6,
          bgcolor: alpha('#f5f7ff', 0.5),
          borderRadius: 4,
        }}>
          <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            Be the first to comment!
          </Typography>
        </Box>
      ) : (
        <Box>
          {comments.map((comment, index) => (
            <Fade in={true} timeout={500 + index * 100} key={comment.id}>
              <Box>
                {index > 0 && <Divider />}
                <Box sx={{ py: 2 }}>
                  <Comment 
                    comment={comment}
                    refreshComments={refreshComments}
                  />
                </Box>
              </Box>
            </Fade>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CommentList;