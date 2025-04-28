import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Divider,
  Stack,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';

interface LocationState {
  ebookTitle?: string;
  downloadUrl?: string;
}

const ThankYouPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState || {};
  const { ebookTitle, downloadUrl } = state;

  // Trigger the download when the component mounts
  useEffect(() => {
    if (downloadUrl) {
      // Create a slight delay to ensure the browser doesn't block the download
      const timer = setTimeout(() => {
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.target = '_blank';
        link.setAttribute('download', `${ebookTitle || 'ebook'}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [downloadUrl, ebookTitle]);

  return (
    <>
      {/* Hero section to prevent header overlap */}
      <Box
        sx={{
          width: '100%',
          height: '100px',
          bgcolor: 'background.paper',
        }}
      />
      
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            textAlign: 'center',
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          <CheckCircleOutlineIcon
            sx={{ fontSize: 80, color: 'success.main', mb: 2 }}
          />
          
          <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
            Thank You!
          </Typography>
          
          <Typography variant="h6" gutterBottom color="text.secondary">
            {ebookTitle 
              ? `Your e-book "${ebookTitle}" is downloading now.` 
              : 'Your e-book is downloading now.'}
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            If your download doesn't start automatically, please click the button below.
          </Typography>
          
          {downloadUrl && (
            <Button
              variant="contained"
              color="primary"
              size="large"
              href={downloadUrl}
              startIcon={<DownloadIcon />}
              sx={{ mb: 4 }}
              onClick={(e) => {
                e.preventDefault();
                window.open(downloadUrl, '_blank');
              }}
            >
              Download Again
            </Button>
          )}
          
          <Divider sx={{ my: 3 }} />
          
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              component={Link}
              to="/"
              startIcon={<HomeIcon />}
              variant="outlined"
            >
              Back to Home
            </Button>
            <Button
              component={Link}
              to="/ebooks"
              startIcon={<ArrowBackIcon />}
              variant="outlined"
            >
              Browse More E-books
            </Button>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};

export default ThankYouPage;
