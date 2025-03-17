import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';
import { fetchComments } from './services/api';
import { 
  Container, 
  Typography, 
  Box, 
  CssBaseline, 
  ThemeProvider, 
  createTheme,
  CircularProgress,
  Alert,
  Paper,
  Divider,
  alpha
} from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6200ea', // Vibrant purple
      light: '#9d46ff',
      dark: '#0a00b6',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00e5ff', // Bright cyan
      light: '#6effff',
      dark: '#00b2cc',
      contrastText: '#000000',
    },
    background: {
      default: '#f8f9ff', // Light blue-tinted background
      paper: '#ffffff',
    },
    text: {
      primary: '#37474f',
      secondary: '#546e7a',
    },
    error: {
      main: '#ff3d00',
    },
    success: {
      main: '#00c853',
    }
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      marginBottom: '1rem',
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '1.4rem',
      fontWeight: 600,
      letterSpacing: '0em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      letterSpacing: '0.00938em',
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 32px rgba(77, 54, 208, 0.08)',
          borderRadius: 12,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '1.5rem 0',
          borderColor: 'rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 22px',
          boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #6200ea 0%, #9d46ff 100%)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#6200ea',
            },
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },
  },
});

function App() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadComments = async () => {

    try {
      setLoading(true);
      const data = await fetchComments();
      setComments(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load comments');
      setLoading(false);
      console.error(err);
    }

  };

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
              p: 4, 
              textAlign: 'center',
              color: 'white',
              position: 'relative',
              zIndex: 1,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)',
                zIndex: -1,
              }
            }}>
      
        <Container maxWidth="md">

          <Paper 
            elevation={5} 
            sx={{ 
              borderRadius: '16px',
              background: 'linear-gradient(45deg, #6200ea 30%, #9d46ff 90%)',
              mb: 5,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Box sx={{ 
              p: 4, 
              textAlign: 'center',
              color: 'white',
              position: 'relative',
              zIndex: 1,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)',
                zIndex: -1,
              }
            }}>
              <ForumIcon sx={{ fontSize: 60, mb: 2, filter: 'drop-shadow(0px 5px 5px rgba(0,0,0,0.2))' }} />
              <Typography 
                variant="h1" 
                component="h1" 
                gutterBottom
                sx={{ 
                  fontWeight: 'bold',
                  textShadow: '0px 4px 8px rgba(0,0,0,0.15)',
                  mb: 1,
                }}
              >
                Comment Portal
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 400,
                  opacity: 0.95,
                  maxWidth: '80%',
                  mx: 'auto',
                }}
              >
                Share your thoughts with our community
              </Typography>
            </Box>
          </Paper>
          
          {/* Comment Form Section */}
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              mb: 4, 
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f5f7ff 100%)',
            }}
          >
            <CommentForm refreshComments={loadComments} />
          </Paper>
          
          {/* Comments Section */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress size={60} thickness={5} color="secondary" />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ my: 2, borderRadius: '12px' }}>{error}</Alert>
          ) : (
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #ffffff 0%, #f5f7ff 100%)',
              }}
            >
              <CommentList 
                comments={comments} 
                refreshComments={loadComments} 
              />
            </Paper>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;