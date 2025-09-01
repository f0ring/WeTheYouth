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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
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
  getTeamMembers: async () => {
    return apiRequest('/about/team');
  },

  getStories: async () => {
    return apiRequest('/about/stories');
  },

  getImpactStats: async () => {
    return apiRequest('/about/impact');
  },
};

// General APIs
export const generalApi = {
  submitContactForm: async (formData) => {
    return apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  },

  submitVolunteer: async (volunteerData) => {
    return apiRequest('/volunteers', {
      method: 'POST',
      body: JSON.stringify(volunteerData),
    });
  },
};

export default apiRequest;