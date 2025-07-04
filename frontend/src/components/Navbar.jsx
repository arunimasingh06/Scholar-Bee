import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LogOut, 
  User, 
  Bell, 
  Home, 
  FileText, 
  PlusCircle, 
  Settings,
  Award,
  Users,
  BookOpen,
  Info,
  Mail
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getNavItems = () => {
    if (user?.role === 'student') {
      return [
        { to: '/student/dashboard', icon: Home, label: 'Dashboard' },
        { to: '/student/applications', icon: FileText, label: 'My Applications' },
        { to: '/student/profile', icon: User, label: 'Profile' },
      ];
    } else if (user?.role === 'sponsor') {
      return [
        { to: '/sponsor/dashboard', icon: Home, label: 'Dashboard' },
        { to: '/sponsor/create', icon: PlusCircle, label: 'Create Scholarship' },
        { to: '/sponsor/scholarships', icon: Award, label: 'My Scholarships' },
        { to: '/sponsor/profile', icon: Settings, label: 'Profile' },
      ];
    }
    return [];
  };

  const publicNavItems = [
    { to: '/courses', icon: BookOpen, label: 'Courses' },
    { to: '/about', icon: Info, label: 'About' },
    { to: '/contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={user ? (user.role === 'student' ? '/student/dashboard' : '/sponsor/dashboard') : '/'} 
                  className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                ScholarBEE
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              // Authenticated user navigation
              <>
                {getNavItems().map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      location.pathname === item.to
                        ? 'bg-teal-50 text-teal-700 border border-teal-200'
                        : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </>
            ) : (
              // Public navigation
              <>
                {publicNavItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      location.pathname === item.to
                        ? 'bg-teal-50 text-teal-700 border border-teal-200'
                        : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center space-x-3">
                  {user.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-teal-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/student/signup"
                  className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200 bg-gray-50">
        <div className="px-4 py-2 space-y-1">
          {user ? (
            getNavItems().map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.to
                    ? 'bg-teal-100 text-teal-700'
                    : 'text-gray-600 hover:text-teal-600 hover:bg-white'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))
          ) : (
            publicNavItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.to
                    ? 'bg-teal-100 text-teal-700'
                    : 'text-gray-600 hover:text-teal-600 hover:bg-white'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;