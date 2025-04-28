import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Divider,
  Stack,
  IconButton,
  useTheme,
  Paper,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { socialMedia, navigationLinks, contactInfo, companyInfo, logoUrl } from '@config/siteConfig';

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.paper,
        pt: 6,
        pb: 3,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info & Logo */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Box 
                component={RouterLink}
                to="/"
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  mb: 2,
                }}
              >
                <Box
                  component="img"
                  src={logoUrl}
                  alt={companyInfo.name}
                  sx={{ height: 50, mr: 1 }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                  }}
                >
                  {companyInfo.name}
                </Typography>
              </Box>
              
              <Typography 
                variant="body2" 
                color="text.secondary"
                paragraph
                sx={{ flex: 1 }}
              >
                {companyInfo.description}
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  {socialMedia.map((social, index) => (
                    <IconButton
                      key={index}
                      component="a"
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${social.url.split('.com/')[1]} page`}
                      size="small"
                      sx={{
                        color: social.color,
                        '&:hover': {
                          backgroundColor: `${social.color}20`,
                        },
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Liens Rapides
            </Typography>
            <Stack spacing={1}>
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  component={link.external ? 'a' : RouterLink}
                  to={!link.external ? link.path : undefined}
                  href={link.external ? link.path : undefined}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  underline="hover"
                  color="text.secondary"
                  sx={{ 
                    display: 'block',
                    '&:hover': {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Contactez-nous
            </Typography>
            <Stack spacing={2}>
              {contactInfo.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ color: theme.palette.primary.main, mr: 1 }}>
                    {item.icon}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Paper 
              elevation={1}
              sx={{ 
                mt: 3, 
                p: 2, 
                backgroundColor: theme.palette.background.default,
                borderLeft: `4px solid ${theme.palette.primary.main}`,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                Prenez rendez-vous
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Discutons de vos besoins en formation immobilière
              </Typography>
              <Link
                component="a"
                href="https://calendly.com/audreyantonini13/45-minutes-pour-faire-le-point"
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 500,
                  display: 'block',
                  '&:hover': { color: theme.palette.primary.dark },
                }}
              >
                Réserver un créneau →
              </Link>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 2, sm: 0 } }}>
            © {currentYear} {companyInfo.name}. Tous droits réservés.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Link component={RouterLink} to="/privacy" color="text.secondary" underline="hover">
              Politique de confidentialité
            </Link>
            <Link component={RouterLink} to="/terms" color="text.secondary" underline="hover">
              Conditions d'utilisation
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
