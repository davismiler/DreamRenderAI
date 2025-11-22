import { useState, useCallback } from 'react';

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

const STORAGE_KEY = 'dream-render-images';
const MAX_STORED_IMAGES = 50;

// Load images from localStorage
export const loadStoredImages = (): GeneratedImage[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const images = JSON.parse(stored) as GeneratedImage[];
      // Sort by timestamp (newest first) and limit
      return images.sort((a, b) => b.timestamp - a.timestamp).slice(0, MAX_STORED_IMAGES);
    }
  } catch (error) {
    console.error('Error loading stored images:', error);
  }
  return [];
};

// Save images to localStorage
export const saveImagesToStorage = (images: GeneratedImage[]): void => {
  try {
    // Keep only the most recent images
    const imagesToStore = images
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, MAX_STORED_IMAGES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(imagesToStore));
  } catch (error) {
    console.error('Error saving images to storage:', error);
  }
};

export const useImageGeneration = () => {
  const [images, setImages] = useState<GeneratedImage[]>(() => loadStoredImages());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addImage = useCallback((image: GeneratedImage) => {
    setImages((prev) => {
      const newImages = [image, ...prev];
      saveImagesToStorage(newImages);
      return newImages;
    });
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearImages = useCallback(() => {
    setImages([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    images,
    loading,
    error,
    setLoading,
    setError,
    addImage,
    clearError,
    clearImages,
  };
};

