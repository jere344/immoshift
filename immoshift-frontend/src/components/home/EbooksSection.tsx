import React, { useRef, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, useTheme, Paper } from '@mui/material';
import { EbookSummary } from '@models/Ebook';
import { Link as RouterLink } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import { motion, useAnimation, useInView } from 'framer-motion';

// Motion components
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionGrid = motion(Grid);
const MotionCard = motion(Card);
const MotionPaper = motion(Paper);

interface EbooksSectionProps {
  ebooks: EbookSummary[];
}

const EbooksSection: React.FC<EbooksSectionProps> = ({ ebooks }) => {
  const theme = useTheme();
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const paperVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };


  if (!ebooks.length) {
    return null;
  }

  return (
    <MotionBox
      id="ebooks"
      ref={ref}
      initial="hidden"
      animate={controls}
      sx={{
        py: 10,
        background: `linear-gradient(180deg, rgba(240, 242, 245, 1) 0%, ${theme.palette.background.default} 100%)`
      }}
    >
      <Container maxWidth="lg">
        <MotionPaper
          elevation={6}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            py: 6,
            px: { xs: 2, sm: 6 },
            background: `linear-gradient(135deg, ${theme.palette.primary.light}15 0%, ${theme.palette.secondary.light}25 100%)`,
          }}
          variants={paperVariants} // Animate the paper container
        >
          <MotionBox sx={{ textAlign: 'center', mb: 6 }} variants={titleVariants}>
            <MotionTypography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                backgroundImage: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontSize: { xs: '2.5rem', md: '3rem' }
              }}
            >
              E-books
            </MotionTypography>
            <MotionTypography
              variant="h5"
              sx={{
                fontWeight: 400,
                maxWidth: '800px',
                mx: 'auto',
                color: theme.palette.text.secondary
              }}
            >
              Téléchargez mes guides pratiques pour approfondir vos connaissances
            </MotionTypography>
          </MotionBox>

          <MotionGrid
            container
            spacing={4}
            variants={containerVariants} // Apply stagger to grid container
          >
            {ebooks.map((ebook) => (
              <MotionGrid
                item
                xs={12}
                sm={6}
                md={4}
                key={ebook.id}
                variants={itemVariants} // Apply item animation
              >
                <MotionCard
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 3,
                    transition: 'transform 0.3s, box-shadow 0.3s', // Keep CSS for direct hover
                    '&:hover': {
                      boxShadow: 8
                    }
                  }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box sx={{ position: 'relative', pt: '60%' }}>
                    <CardMedia
                      component="img"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      image={ebook.cover_image || 'https://via.placeholder.com/400x600?text=E-book'}
                      alt={ebook.title}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: 600, mb: 2 }}
                    >
                      {ebook.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 3, flexGrow: 1 }}
                    >
                      {ebook.description.length > 100
                        ? `${ebook.description.substring(0, 100)}...`
                        : ebook.description}
                    </Typography>

                    <Button
                      component={RouterLink}
                      to={`/ebooks/${ebook.slug}`}
                      variant="contained"
                      color="secondary"
                      startIcon={<DownloadIcon />}
                      sx={{
                        borderRadius: 1.5,
                        textTransform: 'none',
                        fontWeight: 600,
                        mt: 'auto'
                      }}
                    >
                      Télécharger
                    </Button>
                  </CardContent>
                </MotionCard>
              </MotionGrid>
            ))}
          </MotionGrid>
        </MotionPaper>
      </Container>
    </MotionBox>
  );
};

export default EbooksSection;
