import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Grid, CircularProgress, Divider, Paper, Avatar, Link, Chip } from '@mui/material';
import { Article } from '@models/Article';
import ParagraphRenderer from '../shared/ParagraphRenderer';
import api from '@services/api';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import LinkIcon from '@mui/icons-material/Link';
import PersonIcon from '@mui/icons-material/Person';

const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) {
        setError('Article non trouvé');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await api.getArticleBySlug(slug);
        setArticle(response);
        setError(null);
      } catch (err) {
        console.error('Error fetching article details:', err);
        setError('Impossible de charger l\'article. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error || !article) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography variant="h6" color="error">{error || 'Article non trouvé'}</Typography>
      </Box>
    );
  }

  const formattedDate = format(new Date(article.published_at), 'd MMMM yyyy', { locale: fr });

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero section to prevent header overlap */}
      <Box
        sx={{
          width: '100%',
          height: '100px',
          bgcolor: 'background.paper',
        }}
      />
      
      <Container maxWidth="lg" sx={{ py: 6, bgcolor: 'background.default' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8} sx={{ bgcolor: 'background.default' }}>
            <Typography variant="h2" component="h1" sx={{ mb: 3, fontWeight: 700 }}>
              {article.title}
            </Typography>
            
            <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
              <Typography variant="subtitle1" color="text.secondary">
                Publié le {formattedDate}
              </Typography>
              
              {article.source_url && (
                <Chip
                  icon={<LinkIcon />}
                  label="Source externe"
                  variant="outlined"
                  size="small"
                  component={Link}
                  href={article.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  clickable
                />
              )}
            </Box>
            
            {article.image && (
              <Box 
                component="img"
                src={article.image}
                alt={article.title}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  mb: 4,
                  maxHeight: '500px',
                  objectFit: 'cover',
                }}
              />
            )}
            
            <Typography variant="subtitle1" paragraph sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
              {article.excerpt}
            </Typography>
            
            <Divider sx={{ my: 4 }} />
            
            {/* Render paragraphs if available */}
            {article.paragraphs && article.paragraphs.length > 0 && (
              <Box>
                {article.paragraphs.map(paragraph => (
                  <ParagraphRenderer key={paragraph.id} paragraph={paragraph} />
                ))}
              </Box>
            )}
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2, position: 'sticky', top: '100px' }}>
              <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                À propos de cet article
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {article.author ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    {article.author.picture ? (
                      <Avatar 
                        src={article.author.picture}
                        sx={{ width: 48, height: 48, mr: 2 }}
                        alt={article.author.name}
                      />
                    ) : (
                      <Avatar sx={{ mr: 2 }}>{article.author.name.charAt(0)}</Avatar>
                    )}
                    <Box>
                      <Typography variant="subtitle1" fontWeight={500}>{article.author.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{formattedDate}</Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2 }}>IS</Avatar>
                    <Box>
                      <Typography variant="subtitle2">ImmoShift</Typography>
                      <Typography variant="body2" color="text.secondary">{formattedDate}</Typography>
                    </Box>
                  </Box>
                )}
              </Box>
              
              {article.author?.bio && (
                <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
                  {article.author.bio}
                </Typography>
              )}
              
              <Divider sx={{ my: 2 }} />
              
              {article.source_url ? (
                <>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Cet article est repris d'une source externe.
                  </Typography>
                  <Link 
                    href={article.source_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 0.5,
                      fontSize: '0.875rem'
                    }}
                  >
                    <LinkIcon fontSize="small" />
                    Voir l'original
                  </Link>
                </>
              ) : (
                <Typography variant="body2">
                  Restez informé des dernières tendances et innovations dans l'immobilier grâce à nos articles et formations.
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ArticleDetail;
