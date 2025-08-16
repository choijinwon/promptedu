// API utility functions for making requests
const getBaseUrl = () => {
  // In development, use localhost
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  
  // In production, use the current origin
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  // Fallback for server-side
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://promptedu.io';
};

export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  console.log('🌐 API call:', { url, method: options.method || 'GET' });
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  
  console.log('🌐 API response:', { 
    status: response.status, 
    url: response.url,
    headers: Object.fromEntries(response.headers.entries())
  });
  
  return response;
};

export const apiGet = (endpoint: string, options: RequestInit = {}) => {
  return apiCall(endpoint, { ...options, method: 'GET' });
};

export const apiPost = (endpoint: string, data: any, options: RequestInit = {}) => {
  return apiCall(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
};
