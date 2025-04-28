import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  TextField, 
  Button, 
  CircularProgress, 
  Checkbox, 
  FormControlLabel,
  Divider,
  Alert,
  Stack
} from '@mui/material';
import { Ebook, EbookDownloadRequest } from '@models/Ebook';
import api from '@services/api';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

interface FormState {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  consent_mailing: boolean;
}

const EbookDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [ebook, setEbook] = useState<Ebook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [formState, setFormState] = useState<FormState>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    consent_mailing: false
  });
  const [formErrors, setFormErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchEbook = async () => {
      if (!slug) {
        setError('Ebook not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await api.getEbookBySlug(slug);
        setEbook(response);
        setError(null);
      } catch (err) {
        console.error('Error fetching ebook details:', err);
        setError('Failed to load ebook. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEbook();
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is updated
    if (formErrors[name as keyof FormState]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<FormState> = {};
    
    if (!formState.first_name.trim()) errors.first_name = 'Champ obligatoire';
    if (!formState.last_name.trim()) errors.last_name = 'Champ obligatoire';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formState.email.trim()) {
      errors.email = 'Champ obligatoire';
    } else if (!emailRegex.test(formState.email)) {
      errors.email = 'Veuillez entrer une adresse e-mail valide';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !ebook) return;
    
    setSubmitting(true);
    
    try {
      const downloadRequest: EbookDownloadRequest = {
        ebook: ebook.id,
        first_name: formState.first_name,
        last_name: formState.last_name,
        email: formState.email,
        phone: formState.phone || undefined,
        consent_mailing: formState.consent_mailing
      };
      
      const response = await api.downloadEbook(downloadRequest);
      
      if (response.success && response.download_url) {
        // Navigate to thank you page with download info
        navigate('/thank-you', { 
          state: { 
            ebookTitle: ebook.title,
            downloadUrl: response.download_url 
          },
          replace: true // Replace the current entry in history to prevent going back to the form
        });
      } else {
        setError(response.message || 'Failed to process download. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting download form:', err);
      setError('Failed to process download. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error || !ebook) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography variant="h6" color="error">{error || 'E-book introuvable'}</Typography>
      </Box>
    );
  }

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
      
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <img 
                src={ebook.cover_image} 
                alt={ebook.title} 
                style={{ maxWidth: '100%', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} 
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 700 }}>
              {ebook.title}
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 4 }}>
              {ebook.description}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <PictureAsPdfIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="body2" color="text.secondary">
                E-book PDF gratuit
              </Typography>
            </Box>
            
            <Divider sx={{ my: 4 }} />
            
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" component="h3" sx={{ mb: 3 }}>
                Télécharger cet E-book
              </Typography>
              
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Prénom"
                      name="first_name"
                      value={formState.first_name}
                      onChange={handleChange}
                      error={!!formErrors.first_name}
                      helperText={formErrors.first_name}
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nom"
                      name="last_name"
                      value={formState.last_name}
                      onChange={handleChange}
                      error={!!formErrors.last_name}
                      helperText={formErrors.last_name}
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Adresse e-mail"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      error={!!formErrors.email}
                      helperText={formErrors.email}
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Numéro de téléphone (optionnel)"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="consent_mailing"
                          checked={formState.consent_mailing}
                          onChange={handleChange}
                          color="primary"
                        />
                      }
                      label="J'accepte de recevoir des communications marketing"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={submitting}
                      startIcon={submitting ? <CircularProgress size={20} /> : <DownloadIcon />}
                      size="large"
                    >
                      {submitting ? 'Traitement...' : 'Télécharger l\'E-book'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EbookDetail;
