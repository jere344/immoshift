import React, { useEffect, useRef } from 'react';
import { Box, Typography, Avatar, Rating, useTheme } from '@mui/material';
import { motion, useAnimation, useInView } from 'framer-motion';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Testimonial } from '@models/Testimonial';

// Motion components
const MotionBox =  motion.create(Box);
const MotionAvatar =  motion.create(Avatar);

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
        p: 4,
        borderRadius: 4,
        height: '100%',
        overflow: 'hidden',
        background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, ${theme.palette.background.paper} 100%)`,
        backdropFilter: 'blur(10px)',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.07)',
        }
      }}
    >
      <Box sx={{ position: 'absolute', top: 20, right: 20, opacity: 0.07, transform: 'rotate(5deg)' }}>
        <FormatQuoteIcon sx={{ fontSize: 120, color: theme.palette.primary.main }} />
      </Box>
      
      <MotionBox
        variants={quoteVariants}
        sx={{ mb: 3, position: 'relative', zIndex: 1 }}
      >
        <Typography 
          variant="body1" 
          sx={{ 
            fontStyle: 'italic', 
            fontSize: '1.1rem',
            color: theme.palette.text.primary,
            lineHeight: 1.8,
            mb: 3,
            fontWeight: 400,
          }}
        >
          "{testimonial.quote}"
        </Typography>
        
        <Rating 
          value={testimonial.rating} 
          precision={0.5} 
          readOnly 
          sx={{ 
            '& .MuiRating-iconFilled': {
              color: theme.palette.secondary.dark,
            },
            mb: 3
          }} 
        />
      </MotionBox>
      
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <MotionAvatar
          src={testimonial.avatar}
          alt={testimonial.name}
          sx={{ 
            width: 64, 
            height: 64, 
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
              fontWeight: 500
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
