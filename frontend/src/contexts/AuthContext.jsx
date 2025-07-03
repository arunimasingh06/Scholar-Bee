import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

/**
 * 🔐 Authentication Context
 * Manages user authentication state and provides auth methods throughout the app
 */

// User shape for reference
// {
//   id: string,
//   name: string,
//   email: string,
//   role: 'student' | 'sponsor' | 'admin',
//   profileImage?: string,
//   token?: string
// }

const AuthContext = createContext(undefined);

/**
 * 🎣 Custom hook to use authentication context
 * @returns {Object} Authentication context value
 * @throws {Error} If used outside AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * 🔐 Authentication Provider Component
 * Wraps the app and provides authentication state and methods
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * 🔍 Initialize authentication state on app load
   * Checks for stored user session and token
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check for stored user session
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('authToken');
        
        if (storedUser && storedToken) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          
          // Optionally validate token with backend
          // await validateToken();
        }
      } catch (err) {
        console.error('❌ Auth initialization error:', err);
        // Clear invalid stored data
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * 🔐 User Login Method
   * Authenticates user with backend API
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {string} role - User role (student/sponsor)
   * @returns {Promise<boolean>} Success status
   */
  const login = async (email, password, role) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Call backend login API
      const response = await authAPI.login({ email, password, role });
      
      // Create user object from response
      const userData = {
        id: response.user.id,
        name: response.user.fullname,
        email: response.user.email,
        role: response.user.role,
        profileImage: response.user.profileImage,
        token: response.token
      };
      
      // Update state and storage
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('authToken', response.token);
      
      console.log('✅ Login successful:', userData);
      return true;
    } catch (err) {
      console.error('❌ Login failed:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 📝 User Registration Method
   * Registers new user with backend API
   * @param {Object} userData - User registration data
   * @param {string} role - User role (student/sponsor)
   * @returns {Promise<boolean>} Success status
   */
  const signup = async (userData, role) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Map frontend field names to backend field names
      const mappedData = {
        fullname: role === 'sponsor' ? userData.organizationName : userData.fullName,
        email: userData.email,
        password: userData.password,
        ...(role === 'student' && {
          institution: userData.institution,
          educationLevel: userData.educationLevel,
          gpa: userData.gpa,
          familyIncome: userData.familyIncome
        }),
        ...(role === 'sponsor' && {
          organizationType: userData.organizationType,
          organizationName: userData.organizationName
        })
      };
      
      // Call appropriate registration API based on role
      const response = role === 'student' 
        ? await authAPI.registerStudent(mappedData)
        : await authAPI.registerSponsor(mappedData);
      
      // Create user object from response
      const newUser = {
        id: response.user?.id || Date.now().toString(),
        name: userData.fullName || userData.organizationName,
        email: userData.email,
        role,
        profileImage: response.user?.profileImage,
        token: response.token
      };
      
      // Update state and storage
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('authToken', response.token);
      
      console.log('✅ Registration successful:', newUser);
      return true;
    } catch (err) {
      console.error('❌ Registration failed:', err);
      setError(err.message || 'Registration failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 🚪 User Logout Method
   * Clears user session and authentication data
   */
  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    console.log('✅ Logout successful');
  };

  /**
   * 🔄 Clear Error Method
   * Clears any authentication errors
   */
  const clearError = () => {
    setError(null);
  };

  // Context value object
  const value = {
    user,
    login,
    signup,
    logout,
    isLoading,
    error,
    clearError,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};