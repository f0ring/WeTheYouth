import { getAuthToken } from "../services/auth";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`User doesn't exist!: ${response.status} Please Sign Up!`);
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
    const token = getAuthToken();
    return apiRequest('/donations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
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
  submitVolunteer: async (volunteerData) =>
    apiRequest('/volunteers', {
      method: 'POST',
      body: JSON.stringify(volunteerData),
    }),
};

export default apiRequest;
