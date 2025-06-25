/**
 * 📝 Example Usage Component
 * Demonstrates how to use the API service in React components
 */
import React, { useState, useEffect } from 'react';
import { authAPI, studentAPI, publicAPI } from '../services/api';

const ExampleUsage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  /**
   * 🔐 Example: User Login
   */
  const handleLogin = async (credentials) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authAPI.login(credentials);
      console.log('✅ Login successful:', response);
      
      // Store token in localStorage
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      
      setData(response);
    } catch (err) {
      console.error('❌ Login failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 🎓 Example: Get Student Dashboard
   */
  const loadStudentDashboard = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const dashboardData = await studentAPI.getDashboard();
      console.log('✅ Dashboard loaded:', dashboardData);
      setData(dashboardData);
    } catch (err) {
      console.error('❌ Failed to load dashboard:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 🌍 Example: Get Public Data
   */
  const loadPublicData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const publicData = await publicAPI.getLandingData();
      console.log('✅ Public data loaded:', publicData);
      setData(publicData);
    } catch (err) {
      console.error('❌ Failed to load public data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 🏥 Example: Health Check
   */
  const checkHealth = async () => {
    try {
      const health = await publicAPI.healthCheck();
      console.log('✅ Backend health:', health);
      alert(`Backend is ${health.status}!`);
    } catch (err) {
      console.error('❌ Health check failed:', err);
      alert('Backend is not responding!');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🔗 API Integration Examples</h1>
      
      {/* Health Check */}
      <div className="mb-6">
        <button
          onClick={checkHealth}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          🏥 Check Backend Health
        </button>
      </div>

      {/* Login Example */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">🔐 Login Example</h2>
        <button
          onClick={() => handleLogin({ email: 'test@example.com', password: 'password' })}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? '🔄 Logging in...' : 'Login'}
        </button>
      </div>

      {/* Dashboard Example */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">🎓 Student Dashboard Example</h2>
        <button
          onClick={loadStudentDashboard}
          disabled={loading}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
        >
          {loading ? '🔄 Loading...' : 'Load Dashboard'}
        </button>
      </div>

      {/* Public Data Example */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">🌍 Public Data Example</h2>
        <button
          onClick={loadPublicData}
          disabled={loading}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? '🔄 Loading...' : 'Load Public Data'}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>❌ Error:</strong> {error}
        </div>
      )}

      {/* Data Display */}
      {data && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded">
          <h3 className="font-semibold mb-2">📊 Response Data:</h3>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      {/* Usage Instructions */}
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold mb-4">📖 How to Use</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Import the API service: <code>import {`{ authAPI, studentAPI }`} from '../services/api'</code></li>
          <li>Call API methods in async functions</li>
          <li>Handle errors with try-catch blocks</li>
          <li>Store authentication tokens in localStorage</li>
          <li>Use loading states for better UX</li>
        </ol>
      </div>
    </div>
  );
};

export default ExampleUsage; 