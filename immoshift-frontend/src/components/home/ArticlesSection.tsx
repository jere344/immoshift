import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, useTheme, Divider, Avatar, Pagination, Tabs, Tab } from '@mui/material';
import { ArticleSummary } from '@models/Article';
import { Link as RouterLink } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import LinkIcon from '@mui/icons-material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getArticleImage } from '../../utils/placeholderUtils';
import { motion, useAnimation, useInView } from 'framer-motion';

// Motion components
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionGrid = motion(Grid);
const MotionCard = motion(Card);

interface ArticlesSectionProps {
  articles: ArticleSummary[];
}

// Interface for grouped articles
interface GroupedArticles {
  [author: string]: {
    articles: ArticleSummary[];
    authorPicture?: string;
    isExternal: boolean;
  };
}

const ArticlesSection: React.FC<ArticlesSectionProps> = ({ articles }) => {
  const theme = useTheme();
  const [activeAuthor, setActiveAuthor] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const articlesPerPage = 6;
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [groupedArticles, setGroupedArticles] = useState<GroupedArticles>({});

  // Group articles by author
  useEffect(() => {
    const grouped: GroupedArticles = {};
    
    articles.forEach(article => {
      const authorName = article.author_name || (article.source_url ? 'Publications Externes' : 'ImmoShift');
      
      if (!grouped[authorName]) {
        grouped[authorName] = {
          articles: [],
          authorPicture: article.author_picture,
          isExternal: !!article.source_url
        };
      }
      
      grouped[authorName].articles.push(article);
    });
    
    setGroupedArticles(grouped);
    
    // Set the first author as active by default
    if (Object.keys(grouped).length > 0 && !activeAuthor) {
      setActiveAuthor(Object.keys(grouped)[0]);
    }
  }, [articles]);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      setHasAnimated(true);
    }
  }, [isInView, controls]);

  // Reset and play animation when author tab or page changes
  useEffect(() => {
    if (hasAnimated) {
      controls.set('hidden');
      controls.start('visible');
      setPage(1); // Reset to page 1 when changing authors
    }
  }, [activeAuthor, hasAnimated, controls]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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

  // Handle author tab change
  const handleAuthorChange = (event: React.SyntheticEvent, newAuthor: string) => {
    setActiveAuthor(newAuthor);
    setPage(1); // Reset to page 1 when changing authors
  };

  // Get current articles for the active author and page
  const getCurrentArticles = () => {
    if (!activeAuthor || !groupedArticles[activeAuthor]) return [];
    
    const authorArticles = groupedArticles[activeAuthor].articles;
    const indexOfLastArticle = page * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    return authorArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  };

  // Calculate total pages for current author
  const getTotalPages = () => {
    if (!activeAuthor || !groupedArticles[activeAuthor]) return 1;
    return Math.ceil(groupedArticles[activeAuthor].articles.length / articlesPerPage);
  };

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    // Scroll to top of articles section when page changes
    document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
  };

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

  const currentArticles = getCurrentArticles();
  const totalPages = getTotalPages();

  return (
    <MotionBox
      id="articles"
      ref={ref}
      initial="hidden"
      animate={controls}
      sx={{
        py: 10,
        background: theme.palette.background.default
      }}
    >
      <Container maxWidth="lg">
        <MotionBox sx={{ textAlign: 'center', mb: 6 }} variants={titleVariants}>
          <MotionTypography
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
            ImmoShift Insights
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
            Restez informé des dernières tendances et conseils en immobilier
          </MotionTypography>
        </MotionBox>

        {/* Author Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs 
            value={activeAuthor} 
            onChange={handleAuthorChange}
            variant="scrollable"
            scrollButtons={true}
            allowScrollButtonsMobile
            
            aria-label="author tabs"
          >
            {Object.keys(groupedArticles).map((author) => (
              <Tab 
                key={author} 
                value={author} 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {groupedArticles[author].authorPicture ? (
                      <Avatar 
                        src={groupedArticles[author].authorPicture} 
                        sx={{ width: 24, height: 24, mr: 1 }}
                        alt={author} 
                      />
                    ) : groupedArticles[author].isExternal ? (
                      <LinkIcon sx={{ mr: 1 }} />
                    ) : (
                      <PersonIcon sx={{ mr: 1 }} />
                    )}
                    <Typography>{author}</Typography>
                    {author === 'LinkedIn' && <LinkedInIcon sx={{ ml: 1 }} />}
                  </Box>
                } 
                sx={{ 
                  textTransform: 'none', 
                  fontWeight: 500,
                  '&.Mui-selected': { fontWeight: 700 }
                }} 
              />
            ))}
          </Tabs>
        </Box>

        {/* Current Author Section Title */}
        {activeAuthor && (
          <MotionBox sx={{ mb: 4 }} variants={titleVariants}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {groupedArticles[activeAuthor]?.authorPicture && (
                <Avatar 
                  src={groupedArticles[activeAuthor].authorPicture} 
                  sx={{ width: 40, height: 40, mr: 2 }}
                  alt={activeAuthor} 
                />
              )}
              <Typography variant="h4" component="h3" sx={{ fontWeight: 600 }}>
                {activeAuthor}
              </Typography>
            </Box>
          </MotionBox>
        )}

        {/* Articles Grid */}
        <MotionGrid
          container
          spacing={4}
          variants={containerVariants}
          key={`articles-${activeAuthor}-page-${page}`}
        >
          {currentArticles.map((article) => (
            <MotionGrid
              item
              xs={12}
              sm={6}
              md={4}
              key={article.id}
              variants={itemVariants}
            >
              <MotionCard
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
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={getArticleImage(article.image, article.title)}
                  alt={article.title}
                  loading="lazy" // Lazy load images
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

                  {article.author_name && article.author_name !== activeAuthor && (
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
                    to={article.source_url || `/articles/${article.slug}`}
                    target={article.source_url ? "_blank" : "_self"}
                    rel={article.source_url ? "noopener noreferrer" : ""}
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{
                      borderRadius: 1.5,
                      textTransform: 'none',
                      fontWeight: 600,
                      mt: 'auto'
                    }}
                    startIcon={article.source_url ? <LinkIcon /> : null}
                  >
                    {article.source_url ? "Voir sur la source" : "Lire plus"}
                  </Button>
                </CardContent>
              </MotionCard>
            </MotionGrid>
          ))}
        </MotionGrid>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <MotionBox
            sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
              sx={{
                '& .MuiPaginationItem-root': {
                  fontWeight: 600,
                  fontSize: '1rem'
                }
              }}
            />
          </MotionBox>
        )}
      </Container>
    </MotionBox>
  );
};

export default ArticlesSection;
