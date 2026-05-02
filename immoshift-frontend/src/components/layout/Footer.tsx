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
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useSiteConfig } from '../../contexts/SiteConfigContext';

  const navigationLinks = [
      { name: "Accueil", path: "/", home: true },
      { name: "Presentation", path: "/#presentation" },
      { name: "Formations", path: "/#trainings" },
      { name: "Articles", path: "/#articles" },
      { name: "Ebooks", path: "/#ebooks" },
      { name: "Témoignages", path: "/#testimonials" },
      { name: "Contact", path: "https://calendly.com/audreyantonini13/45-minutes-pour-faire-le-point", external: true },
      { name: "FAQ", path: "/#faq" },
];

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  const { config } = useSiteConfig();

  const socialMedia = [
    config?.facebook_url ? { icon: null, color: "#3b5998", url: config.facebook_url, platform: 'facebook' } : null,
    config?.twitter_url ? { icon: null, color: "#1DA1F2", url: config.twitter_url, platform: 'twitter' } : null,
    config?.instagram_url ? { icon: null, color: "#C13584", url: config.instagram_url, platform: 'instagram' } : null,
    config?.linkedin_url ? { icon: <LinkedInIcon />, color: "#0e76a8", url: config.linkedin_url, platform: 'linkedin' } : null,
  ].filter(Boolean);

  const contactInfo = [
    { icon: <EmailIcon />, text: config?.contact_email || '' },
    { icon: <LocationOnIcon />, text: config?.contact_address || '' },
  ].filter(item => item.text);

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.paper,
        pt: 6,
        pb: 12,
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
                  src={config?.logo || ''}
                  alt={config?.company_name || 'ImmoShift'}
                  sx={{ height: 50, mr: 1 }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                  }}
                >
                  {config?.company_name || 'ImmoShift'}
                </Typography>
              </Box>
              
              <Typography 
                variant="body2" 
                color="text.secondary"
                paragraph
                sx={{ flex: 1 }}
              >
                {config?.company_description || ''}
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    {socialMedia.map((social: any, index: number) => (
                      <IconButton
                        key={index}
                        component="a"
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit our ${social.platform} page`}
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
              {navigationLinks.map((link: any) => (
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
              Contactez-moi
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
                href={config?.calendly_url}
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
                Réserver un appel découverte →
              </Link>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'flex-start' }, mb: { xs: 2, sm: 0 } }}>
            <Typography variant="body2" color="text.secondary">
              © {currentYear} {config?.company_name || 'ImmoShift'}. Tous droits réservés.
            </Typography>
            <Link
              component={RouterLink}
              to="/mentions-legales"
              underline="hover"
              sx={{ mt: 0.5, fontSize: '0.85rem' }}
            >
              Mentions légales & RGPD
            </Link>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', opacity: 0.8 }}>
            Développé par{" "}
            <Link 
              href="https://www.linkedin.com/in/j%C3%A9r%C3%A9my-guerin-b9019b255/" 
              target="_blank" 
              rel="noopener noreferrer"
              underline="hover"
              color="inherit"
              sx={{ '&:hover': { color: theme.palette.primary.main } }}
            >
              Jérémy Guerin
            </Link>
            {" · "}
            <Link 
              href="https://github.com/jere344" 
              target="_blank" 
              rel="noopener noreferrer"
              underline="hover"
              color="inherit"
              sx={{ '&:hover': { color: theme.palette.primary.main } }}
            >
              GitHub
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
