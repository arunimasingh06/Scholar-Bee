const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://scholarbeefinal-backend.onrender.com';


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

// ---------------------- APIs ----------------------

// Auth
const authAPI = {
  login: (data) => apiRequest('/api/auth/login', 'POST', data),
  registerSponsor: (data) => apiRequest('/api/auth/register/sponsor', 'POST', data),
  registerStudent: (data) => apiRequest('/api/auth/register/student', 'POST', data),
};

// Student
const studentAPI = {
  getDashboard: (token) => apiRequest('/api/students/dashboard', 'GET', null, token),
  getProfile: (token) => apiRequest('/api/users/profile', 'GET', null, token),
  applyForScholarship: (data, token) => apiRequest('/api/students/apply', 'POST', data, token),
  viewApplications: (token) => apiRequest('/api/students/applications', 'GET', null, token),
};

// Sponsor
const sponsorAPI = {
  getDashboard: (token) => apiRequest('/api/sponsors/dashboard', 'GET', null, token),
  getProfile: (token) => apiRequest('/api/users/profile', 'GET', null, token),
};

// Public (for public routes like scholarship listing)
const publicAPI = {
  getAllScholarships: () => apiRequest('/api/public/scholarships', 'GET'),
  getScholarshipById: (id) => apiRequest(`/api/public/scholarships/${id}`, 'GET'),
};

// User (general profile etc.)
const userAPI = {
  getProfile: (token) => apiRequest('/api/users/profile', 'GET', null, token),
  updateProfile: (data, token) => apiRequest('/api/users/profile', 'PUT', data, token),
};

// ---------------------- Export ----------------------

export { authAPI, studentAPI, sponsorAPI, publicAPI, userAPI };
