import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, useTheme, Paper } from '@mui/material';
import { EbookSummary } from '@models/Ebook';
import { Link as RouterLink } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';

interface EbooksSectionProps {
  ebooks: EbookSummary[];
}

const EbooksSection: React.FC<EbooksSectionProps> = ({ ebooks }) => {
  const theme = useTheme();

  if (!ebooks.length) {
    return null;
  }

  return (
    <Box 
      id="ebooks" 
      sx={{ 
        py: 10, 
        background: `linear-gradient(180deg, rgba(240, 242, 245, 1) 0%, ${theme.palette.background.default} 100%)`
      }}
    >
      <Container maxWidth="lg">
        <Paper 
          elevation={6} 
          sx={{ 
            borderRadius: 4, 
            overflow: 'hidden',
            py: 6, 
            px: { xs: 2, sm: 6 },
            background: `linear-gradient(135deg, ${theme.palette.primary.light}15 0%, ${theme.palette.secondary.light}25 100%)`,
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
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
            </Typography>
            <Typography 
              variant="h5"
              sx={{ 
                fontWeight: 400, 
                maxWidth: '800px', 
                mx: 'auto',
                color: theme.palette.text.secondary
              }}
            >
              Téléchargez nos guides pratiques pour approfondir vos connaissances
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {ebooks.map((ebook) => (
              <Grid item xs={12} sm={6} md={4} key={ebook.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 3,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 8
                    }
                  }}
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
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default EbooksSection;
