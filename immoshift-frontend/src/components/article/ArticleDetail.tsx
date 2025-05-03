import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Grid, CircularProgress, Divider, Paper, Avatar, Link, Chip } from '@mui/material';
import { Article } from '@models/Article';
import ParagraphRenderer from '../shared/ParagraphRenderer';
import api from '@services/api';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import LinkIcon from '@mui/icons-material/Link';
import { getArticleImage } from '../../utils/placeholderUtils';
import { motion } from 'framer-motion'; // Import motion
import { companyInfo, logoUrl } from '@config/siteConfig'; // Import companyInfo and logoUrl

// Animation Variants (reuse or define as needed)
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1 } }
};

// Motion Components
const MotionGrid = motion(Grid);
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionPaper = motion(Paper);
const MotionChip = motion(Chip); // Added for Chip animation

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
  const publishedDateISO = new Date(article.published_at).toISOString();

  // SEO Data
  const pageTitle = `${article.title} - Article ImmoShift`;
  const pageDescription = article.excerpt;
  const canonicalUrl = `${window.location.origin}/articles/${article.slug}`;
  const imageUrl = getArticleImage(article.image, article.title);
  const fullImageUrl = imageUrl.startsWith('http') 
    ? imageUrl 
    : (imageUrl ? `${window.location.origin}${imageUrl}` : `${window.location.origin}${logoUrl.startsWith('/') ? logoUrl.substring(1) : logoUrl}`); // Fallback to logo

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Add native meta tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonicalUrl} />
      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={article.title} />
      <meta property="og:site_name" content={companyInfo.name} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="article:published_time" content={publishedDateISO} />
      {article.author && <meta property="article:author" content={article.author.name} />}
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={article.title} />

      {/* Hero section to prevent header overlap */}
      <Box
        sx={{
          width: '100%',
          height: '100px',
          bgcolor: 'background.paper',
        }}
      />
      
      <Container maxWidth="lg" sx={{ py: 6, bgcolor: 'background.default' }}>
        <MotionGrid container spacing={4} variants={staggerContainer} initial="initial" animate="animate">
          <MotionGrid item xs={12} md={8} sx={{ bgcolor: 'background.default' }} variants={fadeInUp}>
            <MotionTypography variant="h2" component="h1" sx={{ mb: 3, fontWeight: 700 }} variants={fadeInUp}>
              {article.title}
            </MotionTypography>
            
            <MotionBox sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }} variants={staggerContainer}>
              <MotionTypography variant="subtitle1" color="text.secondary" variants={fadeInUp}>
                Publié le {formattedDate}
              </MotionTypography>
              
              {article.source_url && (
                <MotionChip
                  icon={<LinkIcon />}
                  label="Source externe"
                  variant="outlined"
                  size="small"
                  component={Link}
                  href={article.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  clickable
                  variants={fadeInUp}
                />
              )}
            </MotionBox>
            
            {/* Image section - now uses the getArticleImage utility */}
            <MotionBox 
              component={motion.img} // Use motion.img
              src={imageUrl}
              alt={article.title}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                mb: 4,
                maxHeight: '500px',
                objectFit: 'cover',
              }}
              variants={scaleIn} // Apply scaleIn animation
            />
            
            <MotionTypography variant="subtitle1" paragraph sx={{ fontWeight: 500, fontSize: '1.1rem' }} variants={fadeInUp}>
              {article.excerpt}
            </MotionTypography>
            
            <Divider sx={{ my: 4 }} />
            
            {/* Render paragraphs if available */}
            {article.paragraphs && article.paragraphs.length > 0 && (
              <MotionBox variants={staggerContainer}>
                {article.paragraphs.map(paragraph => (
                  <motion.div key={paragraph.id} variants={fadeInUp}>
                    <ParagraphRenderer paragraph={paragraph} />
                  </motion.div>
                ))}
              </MotionBox>
            )}
          </MotionGrid>
          
          <MotionGrid item xs={12} md={4} variants={fadeInUp} transition={{ delay: 0.2 }}>
            <MotionPaper 
              elevation={3} 
              sx={{ p: 3, borderRadius: 2, position: 'sticky', top: '100px' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
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
            </MotionPaper>
          </MotionGrid>
        </MotionGrid>
      </Container>
    </Box>
  );
};

export default ArticleDetail;
