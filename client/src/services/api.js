// src/services/api.js

// Remove this import as it causes circular dependency
// import { getAuthToken } from "../services/auth";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to get token without circular dependency
const getToken = () => {
  return localStorage.getItem('token');
};

// Helper function for API calls
const apiRequest = async (endpoint, options = {}) => {
  try {
    const token = getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    // Add authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// HomePage APIs
export const homeApi = {
  getStatistics: async () => apiRequest('/home/stats'),
  getFeaturedContent: async () => apiRequest('/home/featured'),
  submitNewsletter: async (email) =>
    apiRequest('/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
};

// About Page APIs
export const aboutApi = {
  getStories: async () => apiRequest('/about/stories'),
  getStory: async (id) => apiRequest(`/about/stories/${id}`),
  createStory: async (storyData) =>
    apiRequest('/about/stories', {
      method: 'POST',
      body: JSON.stringify(storyData),
    }),
  getStoriesByCategory: async (category) =>
    apiRequest(`/about/stories/category/${category}`),
};

// Donation APIs
export const donationApi = {
  submitDonation: async (donationData) => {
    return apiRequest('/donations', {
      method: 'POST',
      body: JSON.stringify(donationData),
    });
  },
};

// Volunteer APIs
export const volunteerApi = {
  submitVolunteer: async (volunteerData) =>
    apiRequest('/volunteers', {
      method: 'POST',
      body: JSON.stringify(volunteerData),
    }),
};

// General APIs
export const generalApi = {
  submitContactForm: async (formData) =>
    apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    }),
};

export default apiRequest;