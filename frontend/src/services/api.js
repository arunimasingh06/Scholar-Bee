const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api';

async function apiRequest(path, options = {}) {
  const url = `${API_BASE_URL}/api${path}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    return await response.json();
  } catch (error) {
    console.error('❌ API Request Error:', error);
    throw error;
  }
}

const authAPI = {
  // Register user (student or sponsor)
  registerStudent: (studentData) =>
    apiRequest('/auth/student/signup', {
      method: 'POST',
      body: JSON.stringify(studentData),
    }),

  registerSponsor: (sponsorData) =>
    apiRequest('/auth/sponsor/signup', {
      method: 'POST',
      body: JSON.stringify(sponsorData),
    }),

  // Login user (student, sponsor, admin)
  login: (credentials, role = 'student') =>
    apiRequest(`/auth/${role}/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  // Logout
  logout: () =>
    apiRequest('/auth/logout', {
      method: 'POST',
    }),
};

export default authAPI;
