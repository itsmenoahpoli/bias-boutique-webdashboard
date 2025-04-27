export const getBaseUrl = (): string => {
  const isLocalhost = window.location.hostname === 'localhost';
  return isLocalhost ? 'http://localhost:4000' : import.meta.env.VITE_APP_BE_URL;
};

export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  
  // If the image URL is already absolute (starts with http:// or https://), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Remove leading slash if present to avoid double slashes
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  return `${getBaseUrl()}/${cleanPath}`;
};