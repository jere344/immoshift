import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Chip, Stack, Grid, Paper, Divider, CircularProgress, Avatar } from '@mui/material';
import { Training } from '@models/Training';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ParagraphRenderer from '../shared/ParagraphRenderer';
import api from '@services/api';
import audreyPicture from '@assets/audreyantonini.jpg';
import { motion } from 'framer-motion'; // Import motion
import { companyInfo, logoUrl } from '@config/siteConfig'; // Import companyInfo and logoUrl

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1 } }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

// Motion Components
const MotionGrid = motion(Grid);
const MotionTypography = motion(Typography);
const MotionStack = motion(Stack);
const MotionChip = motion(Chip);
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

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

  // SEO Data
  const pageTitle = `${training.title} - Formation ImmoShift`;
  const pageDescription = training.short_description.split('\n')[0]; // Use first line as description
  const canonicalUrl = `${window.location.origin}/trainings/${training.slug}`;
  const baseImageUrl = training.image
    ? (training.image.startsWith('http') ? training.image : `${window.location.origin}${training.image}`)
    : `${window.location.origin}${logoUrl.startsWith('/') ? logoUrl.substring(1) : logoUrl}`;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Add native meta tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonicalUrl} />
      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={baseImageUrl} />
      <meta property="og:image:alt" content={training.title} />
      <meta property="og:site_name" content={companyInfo.name} />
      <meta property="og:locale" content="fr_FR" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={baseImageUrl} />
      <meta name="twitter:image:alt" content={training.title} />

      {/* Hero section to prevent header overlap */}
      <Box
        sx={{
          width: '100%',
          height: '100px',
          bgcolor: 'background.paper',
        }}
      />
      
      <Container maxWidth="lg" sx={{ py: 6, bgcolor: 'background.default' }}>
        <MotionGrid container spacing={4} variants={staggerContainer} initial="initial" animate="animate">
          <MotionGrid item xs={12} md={8} sx={{ bgcolor: 'background.default' }} variants={fadeInUp}>
            <MotionTypography variant="h2" component="h1" sx={{ mb: 3, fontWeight: 700 }} variants={fadeInUp}>
              {training.title}
            </MotionTypography>
            
            <MotionStack direction="row" spacing={2} sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }} variants={staggerContainer}>
              {training.duration && (
                <MotionChip 
                  icon={<AccessTimeIcon />} 
                  label={training.duration} 
                  color="primary" 
                  variant="outlined" 
                  variants={fadeInUp}
                />
              )}
              
              {training.price !== undefined && training.price > 0 && training.show_price && (
                <MotionChip 
                  label={`${training.price} €`} 
                  color="secondary" 
                  variants={fadeInUp}
                />
              )}
            </MotionStack>
            
            <MotionTypography variant="body1" component="div" sx={{ mb: 2 }} variants={fadeInUp}>
              {training.short_description.split('\n').map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </MotionTypography>
            
            {/* Display training image */}
            {training.image && (
              <MotionBox sx={{ mb: 4, mt: 2, maxWidth: '100%' }} variants={scaleIn}>
                <motion.img 
                  src={training.image} 
                  alt={training.title} 
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />
              </MotionBox>
            )}
            
            <Divider sx={{ my: 4 }} />
            
            {/* Render paragraphs if available */}
            {training.paragraphs && training.paragraphs.length > 0 && (
              <MotionBox variants={staggerContainer}>
                {training.paragraphs.map(paragraph => (
                  <motion.div key={paragraph.id} variants={fadeInUp}>
                    <ParagraphRenderer paragraph={paragraph} />
                  </motion.div>
                ))}
              </MotionBox>
            )}
          </MotionGrid>
          
          <MotionGrid item xs={12} md={4} variants={fadeInUp} transition={{ delay: 0.2 }}>
            <MotionPaper 
              elevation={3} 
              sx={{ p: 3, borderRadius: 2, position: 'sticky', top: '100px' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Typography variant="h5" component="h3" sx={{ mb: 3, fontWeight: 600 }}>
                Détails de la formation
              </Typography>
              
              {/* Author information */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    src={audreyPicture} 
                    alt="Audrey Antonini"
                    sx={{ width: 60, height: 60, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>Audrey Antonini</Typography>
                    <Typography variant="body2" color="text.secondary">Formatrice & Coach</Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ my: 2 }}>
                  Experte en stratégie immobilière et ancienne directrice d'agence, je forme des agents à devenir performants et méthodiques.
                </Typography>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              {training.duration && (
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <AccessTimeIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight={500}>Durée:</Typography>
                    <Typography>{training.duration}</Typography>
                  </Box>
                </Box>
              )}
              
              {training.price !== undefined && training.show_price && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight={500}>Prix:</Typography>
                  <Typography variant="h6" color="primary.main" fontWeight={600}>
                    {training.price} €
                  </Typography>
                </Box>
              )}
              
              {/* You could add a contact or registration button here */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  Une formation conçue pour vous aider à transformer votre approche et votre trajectoire professionnelle.
                </Typography>
              </Box>
            </MotionPaper>
          </MotionGrid>
        </MotionGrid>
      </Container>
    </Box>
  );
};

export default TrainingDetail;
