import React from 'react';
import { Box, Typography, Card, CardMedia, useTheme } from '@mui/material';
import ReactPlayer from 'react-player';
import { Paragraph } from '@models/Paragraph';

interface ParagraphRendererProps {
  paragraph: Paragraph;
}

const ParagraphRenderer: React.FC<ParagraphRendererProps> = ({ paragraph }) => {
  const theme = useTheme();
  console.log('Rendering paragraph:', paragraph); // Debugging line
  
  const renderMedia = () => {
    switch(paragraph.media_type) {
      case 'image':
        return paragraph.image ? (
          <Card elevation={0} sx={{ mb: 3, overflow: 'hidden', borderRadius: 2 }}>
            <CardMedia
              component="img"
              image={paragraph.image}
              alt={paragraph.title || "Image"}
              sx={{ 
                width: '100%',
                maxHeight: '500px',
                objectFit: 'contain'
              }}
            />
          </Card>
        ) : null;
      
      case 'video_url':
        return paragraph.video_url ? (
          <Box sx={{ 
            mb: 3, 
            position: 'relative', 
            paddingTop: '56.25%', // 16:9 aspect ratio
            borderRadius: 2,
            overflow: 'hidden'
          }}>
            <ReactPlayer 
              url={paragraph.video_url}
              width="100%"
              height="100%"
              controls
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
          </Box>
        ) : null;
      
      case 'video_file':
        return paragraph.video_file ? (
          <Box sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
            <video 
              controls 
              width="100%" 
              poster={paragraph.thumbnail || undefined}
              style={{ borderRadius: '8px' }}
            >
              <source src={paragraph.video_file} type="video/mp4" />
              Votre navigateur ne prend pas en charge la lecture de vidéos.
            </video>
          </Box>
        ) : null;
      
      default:
        return null;
    }
  };

  // Helper function to detect and format bullet points
  const formatContent = (content: string) => {
    if (!content) return null;
    
    const lines = content.split('\n');
    const hasBulletPoints = lines.some(line => line.trim().startsWith('•'));
    
    if (!hasBulletPoints) {
      // Regular text without bullet points
      return lines.map((text, index) => (
        <p key={index}>{text}</p>
      ));
    }
    
    // Process content with bullet points
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('•')) {
        // Extract text without the bullet point
        const itemText = trimmedLine.substring(1).trim();
        
        // This is a bullet point item with custom styling
        return (
          <Box
            key={index}
            sx={{
              display: "flex",
              backgroundColor: theme.palette.secondary.light,
              p: 2,
              borderRadius: 1,
              mb: 1, // Add margin bottom for spacing between items
            }}
          >
            <Box
              sx={{
                width: "10px",
                height: "10px",
                flexShrink: 0,
                borderRadius: "50%",
                bgcolor: theme.palette.primary.main,
                mr: 2,
                mt: 1,
              }}
            />
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
              {itemText}
            </Typography>
          </Box>
        );
      } else if (trimmedLine) {
        // This is a regular paragraph
        return <p key={index}>{trimmedLine}</p>;
      }
      return <React.Fragment key={index}></React.Fragment>; // Empty line
    });
  };

  return (
    <Box sx={{ mb: 4, bgcolor: 'inherit' }}>
      {paragraph.title && (
        <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
          {paragraph.title}
        </Typography>
      )}
      
      {paragraph.media_type !== 'none' && renderMedia()}
      
      {paragraph.content && (
        <Typography variant="body1" component="div" sx={{ mb: 2 }}>
          {formatContent(paragraph.content)}
        </Typography>
      )}
    </Box>
  );
};

export default ParagraphRenderer;
