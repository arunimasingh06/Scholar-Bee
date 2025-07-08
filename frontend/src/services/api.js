const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://scholarbeefinal-backend.onrender.com';

// Generic API function
const apiRequest = async (endpoint, method = 'GET', body = null, token = null) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    return await res.json();
  } catch (error) {
    console.error('❌ API Request Error:', error);
    throw error;
  }
};

// Auth API
const authAPI = {
  login: (data) => apiRequest('/api/auth/login', 'POST', data),
  registerSponsor: (data) => apiRequest('/api/auth/register/sponsor', 'POST', data),
  registerStudent: (data) => apiRequest('/api/auth/register/student', 'POST', data),
};

// Student API
const studentAPI = {
  getDashboard: (token) => apiRequest('/api/students/dashboard', 'GET', null, token),
  getProfile: (token) => apiRequest('/api/users/profile', 'GET', null, token),
};

// Sponsor API
const sponsorAPI = {
  getDashboard: (token) => apiRequest('/api/sponsors/dashboard', 'GET', null, token),
  getProfile: (token) => apiRequest('/api/users/profile', 'GET', null, token),
};

// ✅ Add userAPI
const userAPI = {
  getProfile: (token) => apiRequest('/api/users/profile', 'GET', null, token),
};

// ✅ Export all APIs
export { authAPI, studentAPI, sponsorAPI, userAPI };
