// src/services/api.js

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Safe localStorage access with error handling
const safeLocalStorage = {
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('localStorage setItem failed:', error);
      sessionStorage.setItem(key, value);
    }
  },
  
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn('localStorage getItem failed:', error);
      return sessionStorage.getItem(key);
    }
  },
  
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('localStorage removeItem failed:', error);
    }
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.warn('sessionStorage removeItem failed:', error);
    }
  }
};

// Store token in storage
export const setAuthToken = (token) => {
  if (token) {
    safeLocalStorage.setItem('token', token);
  } else {
    safeLocalStorage.removeItem('token');
  }
};

// Get token from storage
export const getAuthToken = () => {
  return safeLocalStorage.getItem('token');
};

// Helper function to get token without circular dependency
const getToken = () => {
  return getAuthToken();
};

// Token validation function
const validateToken = () => {
  const token = getToken();
  if (!token) {
    throw new Error('No authentication token found. Please login again.');
  }
  
  // Simple JWT expiration check (optional but recommended)
  try {
    // Extract payload from JWT token (if it's a JWT)
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      // Token is expired
      setAuthToken(null);
      throw new Error('Authentication token expired. Please login again.');
    }
  } catch (e) {
    // Token is not a JWT or is malformed - we'll still try to use it
    console.warn('Token validation warning:', e.message);
  }
  
  return token;
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
      // Handle specific HTTP errors
      if (response.status === 401) {
        // Unauthorized - clear token
        setAuthToken(null);
        // Don't redirect immediately - let the component handle it
        throw new Error('Authentication failed. Please login again.');
      }
      
      if (response.status === 404) {
        throw new Error('API endpoint not found. Please check the server.');
      }
      
      if (response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      }
      
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    
    // Provide more specific error messages
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('Cannot connect to server. Please check if the backend is running.');
    }
    
    throw error;
  }
};

// HomePage APIs
export const homeApi = {
  getStatistics: async () => {
    return apiRequest('/home/stats');
  },

  getFeaturedContent: async () => {
    return apiRequest('/home/featured');
  },

  submitNewsletter: async (email) => {
    return apiRequest('/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
};

// About Page APIs
export const aboutApi = {
  getStories: async () => {
    return apiRequest('/about/stories');
  },

  getStory: async (id) => {
    return apiRequest(`/about/stories/${id}`);
  },

  createStory: async (storyData) => {
    return apiRequest('/about/stories', {
      method: 'POST',
      body: JSON.stringify(storyData),
    });
  },

  getStoriesByCategory: async (category) => {
    return apiRequest(`/about/stories/category/${category}`);
  }
};


// In services/api.js - FIXED submitDonation
// Donation APIs - CORRECTED VERSION
export const donationApi = {
  submitDonation: async (donationData) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('Authentication required. Please login first.');
      }

      console.log('Sending donation data:', donationData);
      
      const response = await fetch(`${API_BASE_URL}/donations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Donation submission error:', error);
      throw error;
    }
  },

  getMyDonations: async () => {
    const token = getAuthToken();
    if (!token) {
      console.warn('No auth token available');
      return [];
    }

    try {
      const response = await apiRequest('/donations/my-donations', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      return response || [];
    } catch (error) {
      console.error('Error fetching donations:', error);
      return [];
    }
  },

  getCommunityStats: async () => {
    try {
      return await apiRequest('/donations/community/stats');
    } catch (error) {
      console.error('Error fetching community stats:', error);
      return {
        totalRaised: 0,
        totalDonors: 0,
        recentDonations: [],
        sectionBreakdown: [],
        monthlyGoal: {
          current: 0,
          target: 100000,
          progress: 0
        }
      };
    }
  },

  getDonationById: async (id) => {
    const token = getAuthToken();
    return apiRequest(`/donations/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  }
};

// Volunteer APIs
export const volunteerApi = {
  submitVolunteer: async (volunteerData) => {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Authentication required. Please login first.');
    }

    return apiRequest('/volunteers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(volunteerData),
    });
  },

  getMyApplications: async () => {
    const token = getAuthToken();
    if (!token) {
      console.warn('No auth token available');
      return [];
    }

    try {
      const response = await apiRequest('/volunteers/my-applications', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      return response || [];
    } catch (error) {
      console.error('Error fetching volunteer applications:', error);
      return [];
    }
  }
};

// Auth APIs
export const authApi = {
  register: async (userData) => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  login: async (credentials) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  getCurrentUser: async () => {
    const token = getAuthToken();
    if (!token) {
      return null;
    }
    
    try {
      const response = await apiRequest('/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.user;
    } catch (error) {
      setAuthToken(null);
      return null;
    }
  },

  logout: () => {
    setAuthToken(null);
  }
};

// Contact APIs
export const contactApi = {
  submitContact: async (contactData) => {
    return apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  },

  getMyMessages: async () => {
    const token = getAuthToken();
    if (!token) {
      console.warn('No auth token available');
      return [];
    }

    try {
      const response = await apiRequest('/contact/my-messages', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      return response || [];
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      return [];
    }
  }
};

// General APIs
export const generalApi = {
  submitContactForm: async (formData) => {
    return apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }
};

// Health check API
export const healthCheck = async () => {
  try {
    const response = await apiRequest('/health');
    return { status: 'healthy', response };
  } catch (error) {
    return { status: 'unhealthy', error: error.message };
  }
};

export default apiRequest;