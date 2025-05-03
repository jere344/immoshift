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
import FAQSection from './FAQSection';
import ProfessionalTrainingSection from './ProfessionalTrainingSection';
import { useLocation } from 'react-router-dom';
import { calendlyInfo, companyInfo, logoUrl } from '@config/siteConfig';

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
  const faqRef = useRef<HTMLDivElement>(null);
  const professionalTrainingRef = useRef<HTMLDivElement>(null);

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
      testimonials: testimonialsRef,
      faq: faqRef,
      professionalTraining: professionalTrainingRef
    };
    
    const ref = sectionMap[hash];
    if (ref && ref.current) {
      // Use setTimeout to ensure DOM is fully rendered
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    // Keep the hash in the URL for better user experience
    // Only update history if we're not already at the correct hash
    if (location.hash !== `#${hash}`) {
      window.history.replaceState(null, '', `#${hash}`);
    }
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

  const siteUrl = "https://www.immoshift.fr/";
  const homePageTitle = "ImmoShift - Formation & Coaching Immobilier Stratégique";
  const homePageDescription = "ImmoShift : Formation et coaching pour agents immobiliers. Structurez votre activité, maîtrisez vos méthodes et performez durablement. Approche terrain, PNL et hypnose ericksonienne.";
  const fullLogoUrl = `${siteUrl}${logoUrl.startsWith('/') ? logoUrl.substring(1) : logoUrl}`; // Ensure absolute URL

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100%",
        background: "linear-gradient(180deg, #f7f9fc 0%, white 100%)",
        overflow: "hidden",
        scrollBehavior: "smooth",
        position: "relative",
      }}
    >
      {/* Add native meta tags */}
      <title>{homePageTitle}</title>
      <meta name="description" content={homePageDescription} />
      <link rel="canonical" href={siteUrl} />
      {/* Open Graph */}
      <meta property="og:title" content={homePageTitle} />
      <meta property="og:description" content={homePageDescription} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={fullLogoUrl} />
      <meta property="og:image:alt" content="Logo ImmoShift" />
      <meta property="og:site_name" content={companyInfo.name} />
      <meta property="og:locale" content="fr_FR" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={homePageTitle} />
      <meta name="twitter:description" content={homePageDescription} />
      <meta name="twitter:image" content={fullLogoUrl} />
      <meta name="twitter:image:alt" content="Logo ImmoShift" />
      {/* <meta name="twitter:site" content="@YourTwitterHandle" /> */}

      {homeContent && (
        <>
          <div ref={heroRef} id="hero">
            <HeroSection />
          </div>
          <div ref={presentationRef} id="presentation">
            <PresentationSection />
          </div>
          
          <div>
            <CalendlySection />
          </div>
          
          <div ref={trainingsRef} id="trainings">
            <TrainingsSection trainings={homeContent.trainings} />
          </div>

          <div ref={professionalTrainingRef} id="professionalTraining">
            <ProfessionalTrainingSection />
          </div>
          
          <div ref={articlesRef} id="articles" >
            <ArticlesSection articles={homeContent.articles} />
          </div>
          <div ref={ebooksRef} id="ebooks" >
            <EbooksSection ebooks={homeContent.ebooks} />
          </div>
          <div ref={testimonialsRef} id="testimonials">
            <TestimonialsSection testimonials={homeContent.testimonials} />
          </div>
          <div ref={faqRef} id="faq">
            <FAQSection />
          </div>
          
          {/* Floating CTA Button */}
          <Tooltip title={calendlyInfo.description_short} placement="left" arrow>
            <Paper
              elevation={6}
              sx={{
                position: "fixed",
                bottom: 30,
                right: 30,
                borderRadius: "50px",
                zIndex: 1000,
                display: { xs: 'none', md: 'block' } 
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
