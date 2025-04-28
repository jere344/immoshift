/**
 * Converts a relative image path to an absolute URL using the API base URL
 * @param imagePath - The relative image path from the API
 * @returns The complete image URL
 */
export const getImageUrl = (imagePath: string | undefined | null): string => {
  if (!imagePath) return '';
  
  // If the URL is already absolute, return it as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If the path starts with a slash, remove it to avoid double slashes
  const normalizedPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Combine the API base URL with the image path
  return `${import.meta.env.VITE_API_BASE_URL}/${normalizedPath}`;
};
