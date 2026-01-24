import React from 'react';
import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import home from '@assets/audreyantonini.jpg';
import backgroundImage from '@assets/background.jpg';
import { motion } from 'framer-motion';

// Motion components
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

const HeroSection: React.FC = () => {
  const theme = useTheme();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, x: 50 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }, // Ease-out cubic
  };


  return (
    <MotionBox
      sx={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.dark}20 0%, ${theme.palette.primary.main}10 50%, ${theme.palette.secondary.light}15 100%)`,
        overflow: 'hidden',
        py: 8,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'overlay',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          backgroundColor: theme.palette.background.default,
          opacity: 0.75,
          backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(172, 190, 206, 0.2) 0%, transparent 70%)',
          zIndex: 0
        }
      }}
      initial="hidden"
      animate="visible"
      variants={containerVariants} // Apply container variants to stagger children
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }} disableGutters={true}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
            paddingTop: 3,
          }}
        >
          <MotionBox 
            sx={{ 
              maxWidth: 600,
              position: 'relative',
              padding: { xs: 1.5, sm: 3 },
              borderRadius: 2,
              background: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(2px)',
              zIndex: 2
            }} 
          >
            <MotionTypography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                mb: 2,
                backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.dark} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                lineHeight: 1.2,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -5,
                  left: 0,
                  width: '60%',
                  height: 3,
                  background: theme.palette.primary.main,
                  borderRadius: 2,
                  transformOrigin: 'left',
                }
              }}
              variants={titleVariants}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              ImmoShift
            </MotionTypography>

            <MotionTypography
              variant="h4"
              sx={{
                color: theme.palette.text.primary,
                mb: 2,
                fontWeight: 500,
                lineHeight: 1.4,
                letterSpacing: 0.5,
                justifyContent: 'left',
                textAlign: 'left',
                fontSize: '1.85rem',
              }}
              variants={subtitleVariants}
            >
              VISION - POSTURE BUSINESS
            </MotionTypography>
            
            <MotionTypography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                mb: 2,
                fontSize: '1.1rem',
                lineHeight: 1.8,
                maxWidth: '95%',
                
              }}
              variants={subtitleVariants}
            >
              Des formations professionnelles, à distance ou en présentiel, pour replacer l'agent immobilier à son juste rang : celui d'un référent qu'on ne met plus en concurrence, parce qu'il tient une maîtrise visible et une conduite de vente sans flottement, du premier échange jusqu'à la signature.
            </MotionTypography>

            <MotionTypography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                mb: 2,
                fontSize: '1.1rem',
                lineHeight: 1.8,
                maxWidth: '95%',
                
              }}
              variants={subtitleVariants}
            >
               L'objectif : faire passer l'agent du statut "interchangeable" au statut d'évidence avec une tenue commerciale solide, une parole qui engage, et une manière de mener chaque dossier qui amène vendeurs et acheteurs à s'aligner sur une stratégie claire, sans test permanent, sans perte d'ascendant, et sans dilution du rôle.
            </MotionTypography>
            
            <MotionTypography
              variant="h6"
              sx={{
                color: theme.palette.primary.main,
                mb: 4,
                fontWeight: 600,
                letterSpacing: 1,
              }}
              variants={subtitleVariants}
            >
              Méthode. Discipline. Exécution.
            </MotionTypography>

            <MotionBox
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2
              }}
              variants={buttonVariants} // Apply variants to the container for simultaneous animation
            >
              <MotionButton
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                href="/#trainings"
                sx={{
                  py: 1.5,
                  px: 4,
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Découvrir mes formations
              </MotionButton>

              <MotionButton
                variant="outlined"
                color="primary"
                size="large"
                href="/#presentation"
                sx={{
                  py: 1.5,
                  px: 4,
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                  backgroundColor: theme.palette.background.paper,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                En savoir plus
              </MotionButton>
            </MotionBox>
                      </MotionBox>

          <MotionBox
            sx={{
              width: { xs: '300px', md: '320px', lg: '360px' },
              height: { xs: '400px', md: '480px', lg: '540px' },
              maxWidth: { xs: '100%', md: '35%' },
              aspectRatio: { xs: '3/4', md: '2/3', lg: '2/3' },
              bgcolor: 'white',
              borderRadius: 4,
              boxShadow: 3,
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: { xs: '0 auto', md: 0 },
              alignSelf: { xs: 'flex-end', md: 'center' },
              marginRight: { xs: 1, md: 'auto' },
            }}
            variants={imageVariants}
          >
            <motion.img
              src={home}
              alt="Real estate expertise"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: '50% 35%', // Center horizontally, position vertically to show face (35% from top)
              }}
              initial={{ scale: 1.1 }} // Slight zoom-in effect initially
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} // Slow zoom-out
            />
          </MotionBox>
        </Box>
      </Container>
    </MotionBox>
  );
};

export default HeroSection;
