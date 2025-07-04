import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Award, User, Building } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(formData.email, formData.password, formData.role);
      if (success) {
        navigate(formData.role === 'student' ? '/student/dashboard' : '/sponsor/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
                <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center transform -rotate-12">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
                <span className="text-xs font-bold text-yellow-900">₹</span>
              </div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-orange-400 rounded-full"></div>
              <div className="absolute top-1 -left-1 w-2 h-2 bg-orange-300 rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">ScholarBEE</span>
              <span className="text-xs text-green-600 font-medium -mt-1">Empowering Education</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to continue your learning journey</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I am a:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'student' }))}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all duration-200 ${
                    formData.role === 'student'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 hover:border-green-300 text-gray-600 hover:text-green-600'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'sponsor' }))}
                  className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all duration-200 ${
                    formData.role === 'sponsor'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 hover:border-green-300 text-gray-600 hover:text-green-600'
                  }`}
                >
                  <Building className="w-5 h-5" />
                  <span className="font-medium">Sponsor</span>
                </button>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              <Link to="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
                Forgot your password?
              </Link>
            </div>
          </form>

          {/* Sign Up Links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600 mb-4">
              Don't have an account?
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/student/signup"
                className="text-center py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 text-sm font-medium"
              >
                Sign up as Student
              </Link>
              <Link
                to="/sponsor/signup"
                className="text-center py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 text-sm font-medium"
              >
                Sign up as Sponsor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;