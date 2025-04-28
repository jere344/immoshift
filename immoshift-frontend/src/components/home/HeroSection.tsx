import React from 'react';
import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HeroSection: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Box 
      sx={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.dark}20 0%, ${theme.palette.primary.main}10 50%, ${theme.palette.secondary.light}15 100%)`,
        overflow: 'hidden',
        py: 8,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(172, 190, 206, 0.3) 0%, transparent 70%)',
          zIndex: 0
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
          }}
        >
          <Box sx={{ maxWidth: 600 }}>
            <Typography 
              variant="h1" 
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                mb: 2,
                backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.dark} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                lineHeight: 1.2
              }}
            >
              Votre Expertise Immobilière
            </Typography>
            
            <Typography 
              variant="h4" 
              sx={{ 
                color: theme.palette.text.secondary,
                mb: 4,
                fontWeight: 400,
                lineHeight: 1.4
              }}
            >
              Formations et conseils pour réussir dans l'investissement immobilier
            </Typography>
            
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' }, 
                gap: 2 
              }}
            >
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                endIcon={<ArrowForwardIcon />}
                href="/home/#trainings"
                sx={{ 
                  py: 1.5, 
                  px: 4,
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                Découvrir nos formations
              </Button>
              
              <Button 
                variant="outlined"
                color="primary"
                size="large"
                href="/home/#presentation"
                sx={{ 
                  py: 1.5, 
                  px: 4,
                  fontWeight: 600, 
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                En savoir plus
              </Button>
            </Box>
          </Box>
          
          <Box 
            sx={{
              width: { xs: '100%', md: '40%' },
              height: { xs: '300px', md: '400px' },
              bgcolor: 'white',
              borderRadius: 4,
              boxShadow: 3,
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="body1" color="text.secondary">Image placeholder</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
