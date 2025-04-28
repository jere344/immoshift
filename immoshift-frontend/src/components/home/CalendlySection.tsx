import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { calendlyInfo } from '@config/siteConfig';

const CalendlySection: React.FC = () => {
  return (
    <Box 
      sx={{ 
        py: 6, 
        px: 2,
        backgroundColor: "#f5f5f5",
        textAlign: "center" 
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h4" component="h2" gutterBottom>
          Prêt à faire évoluer votre activité immobilière ?
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          {calendlyInfo.description}
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          size="large"
          href={calendlyInfo.url}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<EventAvailableIcon />}
          sx={{ 
            py: 1.5, 
            px: 4, 
            fontSize: "1.2rem",
            fontWeight: "bold"
          }}
        >
          {calendlyInfo.title}
        </Button>
      </Container>
    </Box>
  );
};

export default CalendlySection;
