import React, { useRef, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { calendlyInfo } from '@config/siteConfig';
import { motion, useAnimation, useInView } from 'framer-motion';

// Motion components
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

const CalendlySection: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <MotionBox
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants} // Apply stagger to the main box
      sx={{
        py: 12,
        px: 2,
        backgroundColor: "#f5f5f5",
        textAlign: "center"
      }}
    >
      <Container maxWidth="md">
        <MotionTypography
          variant="h4"
          component="h2"
          gutterBottom
          variants={itemVariants} // Animate title
        >
          Prêt à faire évoluer votre activité immobilière ?
        </MotionTypography>
        <MotionTypography
          variant="body1"
          paragraph
          sx={{ mb: 4 }}
          variants={itemVariants} // Animate description
        >
          {calendlyInfo.description}
        </MotionTypography>
        <MotionButton
          variant="contained"
          color="primary"
          size="large"
          href={calendlyInfo.url}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<EventAvailableIcon />}
          sx={{
            py: 1.5,
            px: 4,
            fontSize: "1.2rem",
            fontWeight: "bold"
          }}
          variants={itemVariants} // Animate button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {calendlyInfo.title}
        </MotionButton>
      </Container>
    </MotionBox>
  );
};

export default CalendlySection;
