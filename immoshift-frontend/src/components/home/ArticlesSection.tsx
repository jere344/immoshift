import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, useTheme, Divider, Avatar } from '@mui/material';
import { ArticleSummary } from '@models/Article';
import { Link as RouterLink } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import LinkIcon from '@mui/icons-material/Link';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ArticlesSectionProps {
  articles: ArticleSummary[];
}

const ArticlesSection: React.FC<ArticlesSectionProps> = ({ articles }) => {
  console.log('Articles:', articles); // Debugging line to check the articles data
  const theme = useTheme();

  if (!articles.length) {
    return null;
  }

  // Format date for display
  const formatDate = (dateString: string): string => {
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Box 
      id="articles" 
      sx={{ 
        py: 10, 
        background: theme.palette.background.default
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            component="h2" 
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontSize: { xs: '2.5rem', md: '3rem' }
            }}
          >
            Derniers Articles
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
            Restez informé des dernières tendances et conseils en immobilier
          </Typography>
        </Box>

        {/* Articles Grid */}
        <Grid container spacing={4}>
          {articles.slice(0, 6).map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 2,
                  overflow: 'hidden',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={article.image || 'https://via.placeholder.com/400x200?text=Article'}
                  alt={article.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarTodayIcon sx={{ fontSize: '0.8rem', mr: 0.5, color: theme.palette.text.secondary }} />
                      <Typography variant="body2" color="text.secondary" fontSize="0.8rem">
                        {formatDate(article.published_at)}
                      </Typography>
                    </Box>
                    {article.source_url && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LinkIcon sx={{ fontSize: '0.8rem', mr: 0.5, color: theme.palette.text.secondary }} />
                        <Typography variant="body2" color="text.secondary" fontSize="0.8rem">
                          Source externe
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    gutterBottom 
                    sx={{ fontWeight: 600, mb: 1, lineHeight: 1.3 }}
                  >
                    {article.title}
                  </Typography>
                  
                  {article.author_name && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      {article.author_picture ? (
                        <Avatar 
                          src={article.author_picture}
                          sx={{ width: 24, height: 24, mr: 1 }}
                          alt={article.author_name}
                        />
                      ) : (
                        <PersonIcon sx={{ fontSize: '1rem', mr: 1, color: theme.palette.primary.main }} />
                      )}
                      <Typography variant="body2" color="text.primary" fontSize="0.9rem">
                        {article.author_name}
                      </Typography>
                    </Box>
                  )}
                  
                  <Divider sx={{ my: 1.5 }} />
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ mb: 2, flexGrow: 1 }}
                  >
                    {article.excerpt.length > 120 
                      ? `${article.excerpt.substring(0, 120)}...` 
                      : article.excerpt}
                  </Typography>
                  
                  <Button 
                    component={RouterLink}
                    to={`/articles/${article.slug}`}
                    variant="outlined" 
                    color="primary" 
                    size="small" 
                    sx={{ 
                      borderRadius: 1.5,
                      textTransform: 'none',
                      fontWeight: 600,
                      mt: 'auto'
                    }}
                  >
                    Lire plus
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {articles.length > 6 && (
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Button 
              component={RouterLink}
              to="/articles"
              variant="outlined" 
              color="primary" 
              size="large" 
              sx={{ 
                borderRadius: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                px: 4
              }}
            >
              Voir tous les articles
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ArticlesSection;
