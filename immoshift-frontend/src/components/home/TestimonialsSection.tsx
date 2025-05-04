import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, useTheme, useMediaQuery } from '@mui/material';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Testimonial } from '@models/Testimonial';
import TestimonialCard from './TestimonialCard';
import Masonry from '@mui/lab/Masonry';

// Motion components
const MotionTypography = motion(Typography);

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        delay: 0.2
      }
    }
  };

  // Determine number of columns based on screen size
  const columns = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <Box 
      id="testimonials" 
      py={10}
      sx={{
        background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, rgba(172, 190, 206, 0.15) 100%)`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(172, 190, 206, 0.15) 0%, transparent 70%)',
          zIndex: 0
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box ref={ref} sx={{ textAlign: 'center', mb: 8 }}>
          <MotionTypography 
            variant="h2" 
            initial="hidden"
            animate={controls}
            variants={titleVariants}
            sx={{
              fontWeight: 700,
              backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.dark} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 2,
              fontSize: {
                xs: '2.5rem',
                md: '3.5rem'
              }
            }}
          >
            Expériences des clients
          </MotionTypography>
          
          <MotionTypography 
            variant="h5"
            initial="hidden"
            animate={controls}
            variants={subtitleVariants}
            sx={{ 
              maxWidth: '700px', 
              mx: 'auto', 
              color: theme.palette.text.secondary,
              mb: 5,
              fontWeight: 400
            }}
          >
            Découvrez ce que mes clients disent de leur expérience
          </MotionTypography>
        </Box>

        <Masonry 
          columns={columns} 
          spacing={3}
          sx={{ 
            margin: 0,
            width: 'auto'
          }}
        >
          {testimonials.map((testimonial, index) => (
            <Box key={testimonial.id} sx={{ width: '100%', display: 'block' }}>
              <TestimonialCard testimonial={testimonial} index={index} />
            </Box>
          ))}
        </Masonry>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
