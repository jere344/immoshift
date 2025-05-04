import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  IconButton, 
  Typography, 
  Container, 
  Button, 
  useTheme,
  useScrollTrigger,
  Slide,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Fab,
  Zoom,
  alpha,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Link as RouterLink } from 'react-router-dom';
import { navigationLinks, transparentLogoUrl, companyInfo } from '@config/siteConfig';
import { motion } from 'framer-motion';

// Motion components
const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionIconButton = motion(IconButton);
const MotionFab = motion(Fab);
const MotionListItem = motion(ListItem);

interface HideOnScrollProps {
  children: React.ReactElement;
}

// Hide header on scroll down
function HideOnScroll({ children }: HideOnScrollProps) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header: React.FC = () => {
  const theme = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const handleOpenMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  // Function to handle scrolling to top
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Track scroll position to show/hide the button and change header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setShowScrollTop(true);
        setScrolled(true);
      } else {
        setShowScrollTop(false);
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Filter navigation links to exclude home/accueil in both desktop and mobile views
  const visibleNavLinks = navigationLinks.filter(link => !link.home);

  // Animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  const logoVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };

  const mobileMenuItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <>
      <HideOnScroll>
        <AppBar 
          position="fixed" 
          elevation={0}
          sx={{
            backgroundColor: scrolled 
              ? 'rgba(255, 255, 255, 0.95)' 
              : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: scrolled 
              ? `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
              : '1px solid transparent',
            transition: 'all 0.3s ease-in-out',
            boxShadow: scrolled 
              ? `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}` 
              : 'none',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: scrolled ? 70 : 90, transition: 'height 0.3s ease' }}>
              {/* Logo and Company Name - Desktop */}
              <MotionBox 
                sx={{ display: 'flex', alignItems: 'center' }}
                initial="initial"
                animate="animate"
                whileHover="hover"
                variants={logoVariants}
              >
                <Box 
                  component={RouterLink}
                  to="/"
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                >
                 <Typography
                    variant="h6"
                    noWrap
                    sx={{
                      fontWeight: 700,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '0.5px',
                      display: 'flex', // Changed to always display
                    }}
                  >
                    {companyInfo.name}
                    <TrendingUpIcon sx={{ ml: 1, height: "auto", color: theme.palette.primary.main }} />
                  </Typography>
                </Box>
              </MotionBox>
              
              {/* Desktop Navigation Links */}
              <Box sx={{ display: { xs: 'none', xl: 'flex' } }}>
                {visibleNavLinks.map((link, index) => (
                  <MotionButton
                    key={link.name}
                    component={link.external ? 'a' : RouterLink}
                    to={!link.external ? link.path : undefined}
                    href={link.external ? link.path : undefined}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    initial="hidden"
                    animate="visible"
                    variants={navItemVariants}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, color: theme.palette.primary.main }}
                    sx={{ 
                      mx: 1.5, 
                      color: theme.palette.text.primary,
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                      fontWeight: 500,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '0%',
                        height: '2px',
                        bottom: 0,
                        left: '50%',
                        backgroundColor: theme.palette.primary.main,
                        transition: 'all 0.3s ease',
                      },
                      '&:hover::after': {
                        width: '80%',
                        left: '10%',
                      }
                    }}
                  >
                    {link.name}
                  </MotionButton>
                ))}
              </Box>

              {/* Mobile Menu Button */}
              <Box sx={{ display: { xs: 'flex', xl: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="open mobile menu"
                  aria-controls="menu-mobile"
                  aria-haspopup="true"
                  onClick={handleOpenMobileMenu}
                  color="inherit"
                >
                  <MenuIcon sx={{ color: theme.palette.text.primary }} />
                </IconButton>
              </Box>

              {/* Mobile Drawer Menu */}
              <Drawer
                anchor="right"
                open={mobileMenuOpen}
                onClose={handleCloseMobileMenu}
                sx={{
                  '& .MuiDrawer-paper': { 
                    boxSizing: 'border-box',
                    width: '70%',
                    maxWidth: '300px',
                    padding: theme.spacing(2),
                    background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
                    backdropFilter: 'blur(15px)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                  <IconButton 
                    onClick={handleCloseMobileMenu}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
                <MotionBox 
                  sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box
                    component={RouterLink}
                    to="/"
                    onClick={handleCloseMobileMenu}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Box
                      component="img"
                      src={transparentLogoUrl}
                      alt={companyInfo.name}
                      sx={{ height: 80 }}
                    />
                  </Box>
                </MotionBox>
                <List>
                  {visibleNavLinks.map((link, index) => (
                    <MotionListItem 
                      key={link.name} 
                      component={link.external ? 'a' : RouterLink}
                      to={!link.external ? link.path : undefined}
                      href={link.external ? link.path : undefined}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      onClick={handleCloseMobileMenu}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={mobileMenuItemVariants}
                      whileHover={{ 
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        x: 10,
                      }}
                      sx={{
                        textAlign: 'center',
                        py: 1.5,
                        borderRadius: 1,
                        mb: 1,
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                      }}
                    >
                      <ListItemText 
                        primary={link.name} 
                        primaryTypographyProps={{
                          fontWeight: 500,
                          sx: { 
                            color: theme.palette.text.primary,
                            transition: 'color 0.3s ease',
                            '&:hover': { color: theme.palette.primary.main }
                          }
                        }}
                      />
                    </MotionListItem>
                  ))}
                </List>
              </Drawer>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      
      {/* Back to top button */}
      <Zoom in={showScrollTop}>
        <MotionBox
          onClick={handleScrollToTop}
          role="presentation"
          sx={{
            position: 'fixed',
            bottom: { xs: 80, md: 100 }, // Increased height from bottom to avoid overlap
            right: { xs: 20, md: 40 },
            zIndex: 2000,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <MotionFab 
            color="primary" 
            size="small" 
            aria-label="scroll back to top"
            sx={{ 
              boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            }}
          >
            <ArrowUpwardIcon />
          </MotionFab>
        </MotionBox>
      </Zoom>
    </>
  );
};

export default Header;
