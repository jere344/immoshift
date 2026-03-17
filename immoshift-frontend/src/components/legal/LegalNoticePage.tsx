import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import api from '@services/api';
import { RGPDContent } from '@models/RGPD';

const renderMultilineText = (text: string) => {
  return text.split('\n').map((line, index) => (
    <Typography key={`${line}-${index}`} variant="body1" color="text.secondary" sx={{ mb: line ? 1 : 2 }}>
      {line || '\u00A0'}
    </Typography>
  ));
};

const LegalNoticePage: React.FC = () => {
  const [content, setContent] = useState<RGPDContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRGPDContent = async () => {
      try {
        setLoading(true);
        const response = await api.getRGPDContent();
        setContent(response);
        setError(null);
      } catch (err) {
        console.error('Error fetching RGPD content:', err);
        setError('Impossible de charger les mentions légales pour le moment.');
      } finally {
        setLoading(false);
      }
    };

    fetchRGPDContent();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={52} thickness={4} />
      </Box>
    );
  }

  if (error || !content) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', px: 2 }}>
        <Typography variant="h6" color="error">{error || 'Aucune information disponible.'}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 5, md: 8 }, background: 'linear-gradient(180deg, #f7f9fc 0%, white 100%)', minHeight: '80vh' }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            Mentions légales
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Dernière mise à jour: {new Date(content.updated_at).toLocaleDateString('fr-FR')}
          </Typography>

          <Stack spacing={1.2} sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>Éditeur du site</Typography>
            <Typography variant="body1"><strong>{content.owner_name}</strong></Typography>
            <Typography variant="body1">Nom commercial: {content.trade_name}</Typography>
            <Typography variant="body1">Statut: {content.legal_status}</Typography>
            <Typography variant="body1">SIRET: {content.siret}</Typography>
            <Typography variant="body1">Adresse: {content.address}</Typography>
            <Typography variant="body1">Email: {content.email}</Typography>
            <Typography variant="body1">Téléphone: {content.phone}</Typography>
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Stack spacing={1.2} sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>Hébergeur</Typography>
            <Typography variant="body1">Nom: {content.host_name || 'À compléter dans l\'admin'}</Typography>
            <Typography variant="body1">Adresse: {content.host_address || 'À compléter dans l\'admin'}</Typography>
            <Typography variant="body1">Contact: {content.host_contact || 'À compléter dans l\'admin'}</Typography>
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Stack spacing={1} sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>Données personnelles (RGPD)</Typography>
            {renderMultilineText(content.personal_data_text)}
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Stack spacing={1}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>Cookies</Typography>
            {renderMultilineText(content.cookies_text)}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default LegalNoticePage;
