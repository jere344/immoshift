import React from 'react';
import { Box, Container, Typography, Paper, useTheme } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PaidIcon from '@mui/icons-material/Paid';
import { motion } from 'framer-motion';

// Motion components
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionTypography = motion(Typography);

const ProfessionalTrainingSection: React.FC = () => {
  const theme = useTheme();

  // Animation variants
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <Box
      sx={{
        py: 8,
        background: `linear-gradient(135deg, ${theme.palette.primary.light}10 0%, ${theme.palette.background.paper} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          sx={{
            textAlign: "center",
            mb: 6
          }}
        >
          <MotionTypography
            variant="h3"
            component="h2"
            gutterBottom
            variants={itemVariants}
            sx={{
              fontWeight: 700,
              mb: 3,
              backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -5,
                left: '25%',
                width: '50%',
                height: 3,
                background: theme.palette.primary.main,
                borderRadius: 2,
              }
            }}
          >
            Formation Professionnelle
          </MotionTypography>
          
          <MotionTypography
            variant="subtitle1"
            color="textSecondary"
            sx={{ maxWidth: "800px", mx: "auto", mb: 6 }}
            variants={itemVariants}
          >
            Des formations de qualité adaptées à votre parcours professionnel et éligibles à la formation continue
          </MotionTypography>
        </MotionBox>
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            justifyContent: 'center',
          }}
        >
          <MotionPaper
            elevation={4}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            sx={{
              p: 4,
              borderRadius: 3,
              flex: 1,
              borderTop: `4px solid ${theme.palette.primary.main}`,
              maxWidth: { md: '45%' },
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <SchoolIcon color="primary" sx={{ fontSize: 36, mr: 2 }} />
              <Typography variant="h5" component="h3" fontWeight="bold">
                Éligible à la formation professionnelle
              </Typography>
            </Box>
            <Typography variant="body1">
              Elles peuvent être intégrées dans le cadre de la formation professionnelle continue, en fonction des modalités de ton entreprise ou de ton statut.
            </Typography>
          </MotionPaper>

          <MotionPaper
            elevation={4}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            sx={{
              p: 4,
              borderRadius: 3,
              flex: 1,
              borderTop: `4px solid ${theme.palette.secondary.main}`,
              maxWidth: { md: '45%' },
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <PaidIcon color="secondary" sx={{ fontSize: 36, mr: 2 }} />
              <Typography variant="h5" component="h3" fontWeight="bold">
                Tarification sur mesure
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              Le tarif est présenté lors de l'échange, en fonction de l'accompagnement choisi.
              Chaque formation a une structure claire et des objectifs précis.
            </Typography>
            <Typography variant="body1">
              Si ce que tu lis ici résonne, alors il est essentiel que le format, le rythme et l'investissement soient alignés avec toi, ton contexte, et ton ambition.
              On en parle ensemble, simplement, au bon moment.
            </Typography>
          </MotionPaper>
        </Box>
      </Container>
    </Box>
  );
};

export default ProfessionalTrainingSection;
