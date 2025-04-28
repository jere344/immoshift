import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Chip, Stack, Grid, Paper, Divider, CircularProgress } from '@mui/material';
import { Training } from '@models/Training';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ParagraphRenderer from '../shared/ParagraphRenderer';
import api from '@services/api';

const TrainingDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [training, setTraining] = useState<Training | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTraining = async () => {
      if (!slug) {
        setError('Training not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await api.getTrainingBySlug(slug);
        setTraining(response);
        setError(null);
      } catch (err) {
        console.error('Error fetching training details:', err);
        setError('Failed to load training. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTraining();
  }, [slug]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error || !training) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography variant="h6" color="error">{error || 'Training not found'}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero section to prevent header overlap */}
      <Box
        sx={{
          width: '100%',
          height: '100px',
          bgcolor: 'background.paper',
        }}
      />
      
      <Container maxWidth="lg" sx={{ py: 6, bgcolor: 'background.default' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8} sx={{ bgcolor: 'background.default' }}>
            <Typography variant="h2" component="h1" sx={{ mb: 3, fontWeight: 700 }}>
              {training.title}
            </Typography>
            
            <Stack direction="row" spacing={2} sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}>
              {training.duration && (
                <Chip 
                  icon={<AccessTimeIcon />} 
                  label={training.duration} 
                  color="primary" 
                  variant="outlined" 
                />
              )}
              
              {training.price !== undefined && training.price > 0 && training.show_price && (
                <Chip 
                  label={`${training.price} €`} 
                  color="secondary" 
                />
              )}
            </Stack>
            
            <Typography variant="body1" paragraph>
              {training.short_description}
            </Typography>
            
            <Divider sx={{ my: 4 }} />
            
            {/* Render paragraphs if available */}
            {training.paragraphs && training.paragraphs.length > 0 && (
              <Box>
                {training.paragraphs.map(paragraph => (
                  <ParagraphRenderer key={paragraph.id} paragraph={paragraph} />
                ))}
              </Box>
            )}
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                Détails de la formation
              </Typography>
              
              {training.duration && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight={500}>Durée:</Typography>
                  <Typography>{training.duration}</Typography>
                </Box>
              )}
              
              {training.price !== undefined && training.show_price && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight={500}>Prix:</Typography>
                  <Typography>{training.price} €</Typography>
                </Box>
              )}
              
              {/* Add other details or a form for registration */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TrainingDetail;
