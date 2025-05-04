import React, { useEffect, useRef } from 'react';
import { Box, Typography, Avatar, Rating, useTheme } from '@mui/material';
import { motion, useAnimation, useInView } from 'framer-motion';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Testimonial } from '@models/Testimonial';

// Motion components
const MotionBox = motion(Box);
const MotionAvatar = motion(Avatar);

const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => {
  const theme = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1.0]
      } 
    }
  };

  const quoteVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4, 
        delay: index * 0.1 + 0.2
      } 
    }
  };

  return (
    <MotionBox
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      sx={{
        position: 'relative',
        p: 3,
        borderRadius: 4,
        overflow: 'hidden',
        background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, ${theme.palette.background.paper} 100%)`,
        backdropFilter: 'blur(10px)',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.07)',
        },
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ position: 'absolute', top: 15, right: 15, opacity: 0.07, transform: 'rotate(5deg)' }}>
        <FormatQuoteIcon sx={{ fontSize: 100, color: theme.palette.primary.main }} />
      </Box>
      
      <MotionBox
        variants={quoteVariants}
        sx={{ mb: 2, position: 'relative', zIndex: 1, flex: 1 }}
      >
        {testimonial.quote.split('\n').map((paragraph, i) => (
          <Typography 
            key={i}
            variant="body1" 
            paragraph={i < testimonial.quote.split('\n').length - 1}
            sx={{ 
              fontStyle: 'italic', 
              fontSize: '1rem', 
              color: theme.palette.text.primary,
              lineHeight: 1.6,
              mb: i === testimonial.quote.split('\n').length - 1 ? 2 : 1.5, 
              fontWeight: 400,
            }}
          >
            {i === 0 ? `"${paragraph}` : paragraph}
            {i === testimonial.quote.split('\n').length - 1 ? '"' : ''}
          </Typography>
        ))}
        
        <Rating 
          value={testimonial.rating} 
          precision={0.5} 
          readOnly 
          sx={{ 
            '& .MuiRating-iconFilled': {
              color: theme.palette.secondary.dark,
            },
            mb: 2 
          }} 
        />
      </MotionBox>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
        <MotionAvatar
          src={testimonial.avatar}
          alt={testimonial.name}
          sx={{ 
            width: 56, 
            height: 56, 
            mr: 2,
            border: `3px solid ${theme.palette.primary.light}`,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.3, delay: index * 0.1 + 0.3 }
          }}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        />
        <Box>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              fontSize: '1rem',
              color: theme.palette.primary.dark,
              mb: 0.5
            }}
          >
            {testimonial.name}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: theme.palette.secondary.dark,
              fontWeight: 500,
              fontSize: '0.85rem' 
            }}
          >
            {testimonial.role}
          </Typography>
        </Box>
      </Box>
    </MotionBox>
  );
};

export default TestimonialCard;
