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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Link as RouterLink } from 'react-router-dom';
import { navigationLinks, logoUrl, companyInfo } from '@config/siteConfig';

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
  
  // Track scroll position to show/hide the button
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Filter navigation links to exclude home/accueil in both desktop and mobile views
  const visibleNavLinks = navigationLinks.filter(link => !link.home);

  return (
    <>
      <HideOnScroll>
        <AppBar 
          position="fixed" 
          elevation={0}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
              {/* Logo and Company Name - Desktop */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                      color: theme.palette.primary.main,
                      display: { xs: 'none', sm: 'flex' },
                    }}
                  >
                    {companyInfo.name}
                    <ShowChartIcon sx={{ ml: 1, height: "auto"}} />
                  </Typography>
                </Box>
              </Box>
              
              {/* Desktop Navigation Links */}
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {visibleNavLinks.map((link) => (
                  <Button
                    key={link.name}
                    component={link.external ? 'a' : RouterLink}
                    to={!link.external ? link.path : undefined}
                    href={link.external ? link.path : undefined}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    sx={{ 
                      mx: 1, 
                      color: theme.palette.text.primary,
                      '&:hover': {
                        color: theme.palette.primary.main,
                        backgroundColor: 'transparent',
                      },
                      fontWeight: 500
                    }}
                  >
                    {link.name}
                  </Button>
                ))}
              </Box>

              {/* Mobile Menu Button */}
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
                    padding: theme.spacing(2)
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                  <IconButton onClick={handleCloseMobileMenu}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                  <Box
                    component="img"
                    src={logoUrl}
                    alt={companyInfo.name}
                    sx={{ height: 60 }}
                  />
                </Box>
                <List>
                  {visibleNavLinks.map((link) => (
                    <ListItem 
                      key={link.name} 
                      component={link.external ? 'a' : RouterLink}
                      to={!link.external ? link.path : undefined}
                      href={link.external ? link.path : undefined}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      onClick={handleCloseMobileMenu}
                      sx={{
                        textAlign: 'center',
                        py: 1,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover
                        }
                      }}
                    >
                      <ListItemText primary={link.name} />
                    </ListItem>
                  ))}
                </List>
              </Drawer>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      
      {/* Back to top button */}
      <Zoom in={showScrollTop}>
        <Box
          onClick={handleScrollToTop}
          role="presentation"
          sx={{
            position: 'fixed',
            top: 50,
            right: 20,
            zIndex: 2000,
          }}
        >
          <Fab 
            color="primary" 
            size="small" 
            aria-label="scroll back to top"
          >
            <ArrowUpwardIcon />
          </Fab>
        </Box>
      </Zoom>
    </>
  );
};

export default Header;
