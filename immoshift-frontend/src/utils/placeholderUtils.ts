/**
 * Utility function to generate a color from a string (e.g., article title).
 * This ensures the same title always generates the same color.
 * Avoids ugly greens by restricting the color palette.
 */
const stringToColor = (string: string): string => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Define an array of more aesthetically pleasing color codes
  const pleasingColors = [
    '#3498db', '#9b59b6', '#e74c3c', '#f39c12', '#1abc9c', 
    '#5363e6', '#e056fd', '#8e44ad', '#d35400', '#c0392b',
    '#2c3e50', '#7f8c8d', '#16a085', '#f1c40f', '#636e72'
  ];

  // Use the hash to select from our color palette
  const colorIndex = Math.abs(hash) % pleasingColors.length;
  return pleasingColors[colorIndex];
};

/**
 * Generates a contrasting color (black or white) based on background color
 */
const getContrastColor = (hexColor: string): string => {
  // Remove the # if it exists
  const hex = hexColor.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate perceived brightness using the formula:
  // (0.299*R + 0.587*G + 0.114*B)
  const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black for bright colors, white for dark colors
  return brightness > 0.5 ? '#000000' : '#ffffff';
};

/**
 * Creates a data URL for a placeholder image with the given title
 */
export const generatePlaceholder = (title: string, width = 600, height = 340): string => {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Generate consistent color based on title
  const bgColor = stringToColor(title);
  const textColor = getContrastColor(bgColor);
  
  // Fill background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);
  
  // Add text
  ctx.fillStyle = textColor;
  
  // Calculate initial font size (increased for better readability)
  const baseFontSize = Math.floor(height * 0.4);
  let fontSize = Math.max(baseFontSize * (1 - Math.min(title.length / 70, 0.4)), baseFontSize * 0.5); // Higher minimum size
  
  // Start with initial font size
  ctx.font = `bold ${fontSize}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Measure text width and reduce font size if needed
  let textWidth = ctx.measureText(title).width;
  while (textWidth > width * 0.85 && fontSize > 28) { // Higher minimum font size (18px)
    fontSize -= 2;
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    textWidth = ctx.measureText(title).width;
  }
  
  // If text is still too long, wrap it more aggressively
  if (textWidth > width * 0.8) {
    const words = title.split(' ');
    const lines = [];
    const maxWidth = width * 0.8;
    
    // More aggressive wrapping for long titles
    if (title.length > 50) {
      // Split into approximately equal chunks if title is very long
      const charsPerLine = Math.ceil(title.length / Math.ceil(title.length / 25));
      let currentLine = '';
      let currentChars = 0;
      
      words.forEach(word => {
        if (currentChars + word.length + 1 <= charsPerLine || currentLine === '') {
          currentLine += (currentLine ? ' ' : '') + word;
          currentChars += word.length + (currentLine ? 1 : 0);
        } else {
          lines.push(currentLine);
          currentLine = word;
          currentChars = word.length;
        }
      });
      
      if (currentLine) {
        lines.push(currentLine);
      }
    } else {
      // Standard wrapping for moderate length titles
      let currentLine = words[0];
      
      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const testLine = currentLine + ' ' + word;
        const testWidth = ctx.measureText(testLine).width;
        
        if (testWidth < maxWidth) {
          currentLine = testLine;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      
      if (currentLine) {
        lines.push(currentLine);
      }
    }
    
    // Draw wrapped text
    const lineHeight = fontSize * 1.35; // Further increased line height for readability
    const totalTextHeight = lines.length * lineHeight;
    let y = (height - totalTextHeight) / 2 + fontSize / 2;
    
    lines.forEach(line => {
      ctx.fillText(line, width / 2, y);
      y += lineHeight;
    });
  } else {
    // Draw single line text
    ctx.fillText(title, width / 2, height / 2);
  }
  
  // Return as data URL
  return canvas.toDataURL('image/png');
};

/**
 * Determines if we need a placeholder by checking if an image URL exists
 * and returns either the original image or a generated placeholder
 */
export const getArticleImage = (imageUrl: string | undefined | null, title: string): string => {
  if (imageUrl) return imageUrl;
  console.log('No image URL found, generating placeholder for:', title);
  return generatePlaceholder(title);
};
