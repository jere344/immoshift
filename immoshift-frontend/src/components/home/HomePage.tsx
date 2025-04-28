import React, { useEffect, useState, useRef } from 'react';
import { Box, CircularProgress, Typography, Tooltip, Paper, Button } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import api from '@services/api';
import { HomeContent } from '@models/HomeContent';
import TestimonialsSection from './TestimonialsSection';
import HeroSection from './HeroSection';
import PresentationSection from './PresentationSection';
import TrainingsSection from './TrainingsSection';
import ArticlesSection from './ArticlesSection';
import EbooksSection from './EbooksSection';
import CalendlySection from './CalendlySection';
import { useLocation } from 'react-router-dom';
import { calendlyInfo } from '@config/siteConfig';

const HomePage: React.FC = () => {
  const [homeContent, setHomeContent] = useState<HomeContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  
  // Add refs for each section
  const heroRef = useRef<HTMLDivElement>(null);
  const presentationRef = useRef<HTMLDivElement>(null);
  const trainingsRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);
  const ebooksRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        setLoading(true);
        const response = await api.getHomePageContent();
        setHomeContent(response);
        setError(null);
      } catch (err) {
        console.error('Error fetching home page content:', err);
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHomeContent();
  }, []);

  // Function to scroll to a section
  const scrollToSection = (hash: string) => {
    if (!hash) return;
    
    const sectionMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
      hero: heroRef,
      presentation: presentationRef,
      trainings: trainingsRef,
      articles: articlesRef,
      ebooks: ebooksRef,
      testimonials: testimonialsRef
    };
    
    const ref = sectionMap[hash];
    if (ref && ref.current) {
      // Use a small delay to ensure DOM is fully rendered
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }

    // now clear the hash from the URL
    window.history.pushState("", document.title, window.location.pathname + window.location.search);
  };

  // Handle hash navigation
  useEffect(() => {
    if (loading) return; // Don't attempt to scroll while content is loading
    
    // Get hash from location
    const hash = location.hash.substring(1);
    if (hash) {
      scrollToSection(hash);
    }
  }, [location.hash, loading]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100%",
        background: "linear-gradient(180deg, #f7f9fc 0%, white 100%)",
        overflow: "hidden",
        scrollBehavior: "smooth",
        position: "relative", // Added for floating button positioning
      }}
    >
      {homeContent && (
        <>
          <div ref={heroRef} id="hero" style={{ marginBottom: '3rem' }}>
            <HeroSection />
          </div>
          <div ref={presentationRef} id="presentation" style={{ marginBottom: '4rem' }}>
            <PresentationSection />
          </div>
          
          {/* Calendly Section placed after presentation */}
          <div style={{ marginBottom: '4rem' }}>
            <CalendlySection />
          </div>
          
          <div ref={trainingsRef} id="trainings" style={{ marginBottom: '4rem' }}>
            <TrainingsSection trainings={homeContent.trainings} />
          </div>
          <div ref={articlesRef} id="articles" style={{ marginBottom: '4rem' }}>
            <ArticlesSection articles={homeContent.articles} />
          </div>
          <div ref={ebooksRef} id="ebooks" style={{ marginBottom: '4rem' }}>
            <EbooksSection ebooks={homeContent.ebooks} />
          </div>
          <div ref={testimonialsRef} id="testimonials" style={{ marginBottom: '3rem' }}>
            <TestimonialsSection testimonials={homeContent.testimonials} />
          </div>
          
          {/* Floating CTA Button */}
          <Tooltip title={calendlyInfo.description} placement="left" arrow>
            <Paper
              elevation={6}
              sx={{
                position: "fixed",
                bottom: 30,
                right: 30,
                borderRadius: "50px",
                zIndex: 1000,
                display: { xs: 'none', md: 'block' } // Hide on mobile
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                href={calendlyInfo.url}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<EventAvailableIcon />}
                sx={{
                  borderRadius: "50px",
                  padding: "12px 20px",
                  fontWeight: "bold"
                }}
              >
                Réserver un appel découverte
              </Button>
            </Paper>
          </Tooltip>
        </>
      )}
    </Box>
  );
};

export default HomePage;
