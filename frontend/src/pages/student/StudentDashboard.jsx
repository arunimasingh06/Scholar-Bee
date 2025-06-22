import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { 
  Award,
  Clock, 
  Filter,
  Search,
  Star,
  Calendar,
  IndianRupee,
  TrendingUp,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const StudentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data
  const stats = {
    totalEarned: 2500,
    completedTasks: 8,
    pendingApplications: 3,
    currentStreak: 12
  };

  const scholarships = [
    {
      id: 1,
      title: 'Complete Python Programming Course',
      amount: 1000,
      deadline: '2025-02-15',
      category: 'Programming',
      difficulty: 'Beginner',
      applicants: 45,
      description: 'Complete a comprehensive Python programming course and submit your final project.',
      tags: ['Python', 'Programming', 'Beginner']
    },
    {
      id: 2,
      title: 'Community Service Project',
      amount: 750,
      deadline: '2025-02-28',
      category: 'Social Impact',
      difficulty: 'Intermediate',
      applicants: 23,
      description: 'Organize and execute a community service project that benefits at least 50 people.',
      tags: ['Community', 'Social Impact', 'Leadership']
    },
    {
      id: 3,
      title: 'Data Science Certification',
      amount: 1500,
      deadline: '2025-03-10',
      category: 'Data Science',
      difficulty: 'Advanced',
      applicants: 78,
      description: 'Complete a recognized data science certification from platforms like Coursera or edX.',
      tags: ['Data Science', 'Analytics', 'Certification']
    },
    {
      id: 4,
      title: 'Digital Marketing Campaign',
      amount: 800,
      deadline: '2025-02-20',
      category: 'Marketing',
      difficulty: 'Intermediate',
      applicants: 34,
      description: 'Create and execute a digital marketing campaign for a local business or NGO.',
      tags: ['Marketing', 'Digital', 'Campaign']
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'earned',
      title: 'Python Basics Course Completed',
      amount: 500,
      date: '2025-01-15',
      status: 'completed'
    },
    {
      id: 2,
      type: 'applied',
      title: 'Web Development Bootcamp',
      date: '2025-01-14',
      status: 'pending'
    },
    {
      id: 3,
      type: 'earned',
      title: 'Environment Awareness Project',
      amount: 750,
      date: '2025-01-12',
      status: 'completed'
    }
  ];

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || scholarship.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Ujjwal! 👋</h1>
          <p className="text-gray-600">Ready to earn more rewards through learning? Let's explore new opportunities.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earned</p>
                <p className="text-2xl font-bold text-green-600 flex items-center">
                  <IndianRupee className="w-5 h-5 mr-1" />
                  {stats.totalEarned.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Tasks</p>
                <p className="text-2xl font-bold text-blue-600">{stats.completedTasks}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Applications</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingApplications}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-purple-600">{stats.currentStreak} days</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Scholarships */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-blue-600" />
                    Available Scholarships
                  </h2>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search scholarships..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                      <option value="all">All Categories</option>
                      <option value="Programming">Programming</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Social Impact">Social Impact</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {filteredScholarships.map((scholarship) => (
                    <div key={scholarship.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200 hover:border-blue-300">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{scholarship.title}</h3>
                            <span className="text-xl font-bold text-green-600 flex items-center whitespace-nowrap ml-4">
                              <IndianRupee className="w-4 h-4 mr-1" />
                              {scholarship.amount.toLocaleString()}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-4">{scholarship.description}</p>
                          
                          <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(scholarship.difficulty)}`}>
                              {scholarship.difficulty}
                            </span>
                            {scholarship.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
                            </span>
                            <span>{scholarship.applicants} applicants</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2 lg:ml-4">
                          <Link
                            to={`/student/apply/${scholarship.id}`}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 text-center"
                          >
                            Apply Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(activity.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        {activity.amount && (
                          <p className="text-sm text-green-600 font-medium flex items-center mt-1">
                            <IndianRupee className="w-3 h-3 mr-1" />
                            {activity.amount.toLocaleString()}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Link
                    to="/student/applications"
                    className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors text-center block"
                  >
                    View All Applications
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Quick Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Complete your profile to unlock more opportunities</li>
                <li>• Upload certificates to build credibility</li>
                <li>• Apply early to increase your chances</li>
                <li>• Check deadlines regularly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;