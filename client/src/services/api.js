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
      // Handle specific HTTP errors
      if (response.status === 401) {
        // Unauthorized - clear token and redirect to login
        setAuthToken(null);
        window.location.href = '/';
        throw new Error('Authentication failed. Please login again.');
      }
      
      if (response.status === 404) {
        throw new Error('API endpoint not found. Please check the server.');
      }
      
      if (response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      }
      
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if response has content
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error('API request failed:', error);
    
    // Provide more specific error messages
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('Cannot connect to server. Please check if the backend is running.');
    }
    
    throw error;
  }
};

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

// Check if storage is available
export const isStorageAvailable = () => {
  try {
    const test = 'test';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
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

// Donation APIs
export const donationApi = {
  submitDonation: async (donationData) => {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Authentication required. Please login first.');
    }

    return apiRequest('/donations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(donationData),
    });
  },

   getCommunityStats: async () => {
    return apiRequest('/donations/community/stats');
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
      // Return empty array instead of throwing to prevent UI breakage
      return [];
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
      // Return empty array instead of throwing to prevent UI breakage
      return [];
    }
  },

  // Admin functions
  getAllVolunteers: async () => {
    const token = getAuthToken();
    return apiRequest('/volunteers', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  },

  updateVolunteerStatus: async (id, status) => {
    const token = getAuthToken();
    return apiRequest(`/volunteers/${id}/status`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status }),
    });
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
      // If token is invalid, remove it
      setAuthToken(null);
      return null;
    }
  },

  logout: () => {
    setAuthToken(null);
  }
};

// Admin APIs
export const adminApi = {
  getAllDonations: async () => {
    const token = getAuthToken();
    return apiRequest('/admin/donations', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  },

  getAllVolunteers: async () => {
    const token = getAuthToken();
    return apiRequest('/admin/volunteers', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  },

  updateDonationStatus: async (id, statusData) => {
    const token = getAuthToken();
    return apiRequest(`/admin/donations/${id}/status`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(statusData),
    });
  },

  // ADD THIS MISSING FUNCTION
  updateVolunteerStatus: async (id, status) => {
    const token = getAuthToken();
    return apiRequest(`/admin/volunteers/${id}/status`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status }),
    });
  },

  // Temporary admin creation endpoint (for development)
  createAdmin: async (email) => {
    const token = getAuthToken();
    return apiRequest('/auth/create-admin', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email }),
    });
  }
};

// General APIs
export const generalApi = {
  submitContactForm: async (formData) => {
    return apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  },
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

// Debug function to test API connectivity
export const testApiConnection = async () => {
  console.log('Testing API connection to:', API_BASE_URL);
  
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('API connection test result:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      url: response.url
    });
    
    return response.ok;
  } catch (error) {
    console.error('API connection test failed:', error);
    return false;
  }
};

export default apiRequest;