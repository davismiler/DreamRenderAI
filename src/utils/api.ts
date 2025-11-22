// API utility functions

export const getApiBaseUrl = (): string => {
  // If explicitly set via environment variable, use it
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // Check if we're in development mode
  // Vite sets import.meta.env.DEV to true in dev, false in production builds
  const isDevelopment = 
    import.meta.env.DEV || 
    import.meta.env.MODE === 'development' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.includes('localhost');
  
  // In development mode, use Vite proxy to avoid CORS
  if (isDevelopment) {
    return '/api';
  }
  
  // In production, always use direct API URL
  // Vite proxy doesn't work in production builds, so we must use direct URL
  // The API server (api.infip.pro) must allow CORS from your domain
  return 'https://api.infip.pro';
};

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof Error) {
    // Check for CORS errors specifically
    if (
      error.message.includes('Failed to fetch') || 
      error.message.includes('NetworkError') ||
      error.message.includes('CORS') ||
      error.message.includes('Access-Control')
    ) {
      // Check if we're in production and might be hitting CORS
      const isProduction = !import.meta.env.DEV && 
        !window.location.hostname.includes('localhost');
      
      if (isProduction) {
        return {
          message: 'CORS error: The API server may not allow requests from this domain. Please contact support or check API configuration.',
          code: 'CORS_ERROR',
        };
      }
      
      return {
        message: 'Network error. Please check your internet connection and try again.',
        code: 'NETWORK_ERROR',
      };
    }
    
    // Check for HTTP status codes
    const statusMatch = error.message.match(/status: (\d+)/);
    if (statusMatch) {
      const status = parseInt(statusMatch[1]);
      switch (status) {
        case 401:
          return {
            message: 'Invalid API key. Please check your API key in the .env file.',
            status: 401,
            code: 'UNAUTHORIZED',
          };
        case 403:
          return {
            message: 'Access forbidden. Please check your API permissions.',
            status: 403,
            code: 'FORBIDDEN',
          };
        case 429:
          return {
            message: 'Rate limit exceeded. Please wait a moment and try again.',
            status: 429,
            code: 'RATE_LIMIT',
          };
        case 500:
        case 502:
        case 503:
          return {
            message: 'Server error. Please try again later.',
            status,
            code: 'SERVER_ERROR',
          };
        default:
          return {
            message: `Request failed: ${error.message}`,
            status,
            code: 'HTTP_ERROR',
          };
      }
    }
    
    return {
      message: error.message || 'An unexpected error occurred.',
      code: 'UNKNOWN_ERROR',
    };
  }
  
  return {
    message: 'An unexpected error occurred. Please try again.',
    code: 'UNKNOWN_ERROR',
  };
};

export const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout = 60000 // 60 seconds default
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout. The server took too long to respond.');
    }
    throw error;
  }
};

