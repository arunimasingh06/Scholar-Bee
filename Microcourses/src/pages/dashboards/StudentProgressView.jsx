import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  IndianRupee,
  Calendar,
  Award,
  TrendingUp,
  FileText,
  Eye,
  Download,
  Star,
  Target,
  BookOpen,
  Users
} from 'lucide-react';

const StudentProgressView = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock student progress data
  const studentStats = {
    totalApplications: 12,
    approved: 8,
    pending: 3,
    rejected: 1,
    totalEarned: 45000,
    completionRate: 92,
    currentLevel: 'Advanced Learner',
    streak: 15
  };

  const applications = [
    {
      id: 1,
      title: 'Full Stack Web Development Bootcamp',
      amount: 15000,
      status: 'funded',
      appliedDate: '2024-12-15',
      approvedDate: '2024-12-20',
      completedDate: '2025-01-15',
      institution: 'Tech Academy',
      progress: 100,
      milestones: [
        { name: 'HTML/CSS Basics', completed: true, date: '2024-12-25' },
        { name: 'JavaScript Fundamentals', completed: true, date: '2025-01-02' },
        { name: 'React Development', completed: true, date: '2025-01-08' },
        { name: 'Final Project', completed: true, date: '2025-01-15' }
      ]
    },
    {
      id: 2,
      title: 'Data Science with Python',
      amount: 12000,
      status: 'shortlisted',
      appliedDate: '2025-01-10',
      approvedDate: '2025-01-18',
      institution: 'Data Institute',
      progress: 65,
      milestones: [
        { name: 'Python Basics', completed: true, date: '2025-01-20' },
        { name: 'Data Analysis', completed: true, date: '2025-01-25' },
        { name: 'Machine Learning', completed: false, date: null },
        { name: 'Capstone Project', completed: false, date: null }
      ]
    },
    {
      id: 3,
      title: 'Digital Marketing Certification',
      amount: 8000,
      status: 'applied',
      appliedDate: '2025-01-22',
      institution: 'Marketing Hub',
      progress: 0,
      milestones: []
    },
    {
      id: 4,
      title: 'Mobile App Development',
      amount: 18000,
      status: 'applied',
      appliedDate: '2025-01-20',
      institution: 'Mobile Academy',
      progress: 0,
      milestones: []
    },
    {
      id: 5,
      title: 'Community Service Leadership',
      amount: 5000,
      status: 'applied',
      appliedDate: '2025-01-19',
      institution: 'Social Impact Foundation',
      progress: 0,
      milestones: []
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Scholarship',
      description: 'Completed your first funded program',
      icon: '🎯',
      date: '2024-12-20',
      points: 100
    },
    {
      id: 2,
      title: 'Quick Learner',
      description: 'Completed a program 2 weeks early',
      icon: '⚡',
      date: '2025-01-15',
      points: 150
    },
    {
      id: 3,
      title: 'Consistent Performer',
      description: 'Maintained 15-day learning streak',
      icon: '🔥',
      date: '2025-01-22',
      points: 200
    }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: 'Machine Learning Module',
      program: 'Data Science with Python',
      deadline: '2025-02-05',
      daysLeft: 14
    },
    {
      id: 2,
      title: 'Digital Marketing Assignment',
      program: 'Digital Marketing Certification',
      deadline: '2025-02-10',
      daysLeft: 19
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'shortlisted': return 'bg-yellow-100 text-yellow-800';
      case 'funded': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'applied': return <Clock className="w-4 h-4" />;
      case 'shortlisted': return <Eye className="w-4 h-4" />;
      case 'funded': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const formatStatus = (status) => {
    switch (status) {
      case 'applied': return 'Applied';
      case 'shortlisted': return 'In Progress';
      case 'funded': return 'Completed';
      case 'rejected': return 'Rejected';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Learning Progress</h1>
          <p className="text-gray-600">Track your scholarship applications and learning journey</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{studentStats.totalApplications}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved & Funded</p>
                <p className="text-2xl font-bold text-green-600">{studentStats.approved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earned</p>
                <p className="text-2xl font-bold text-purple-600 flex items-center">
                  <IndianRupee className="w-5 h-5 mr-1" />
                  {studentStats.totalEarned.toLocaleString()}
                </p>
              </div>
              <IndianRupee className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-orange-600">{studentStats.completionRate}%</p>
              </div>
              <Target className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: TrendingUp },
                { id: 'applications', label: 'Applications', icon: FileText },
                { id: 'progress', label: 'Learning Progress', icon: BookOpen },
                { id: 'achievements', label: 'Achievements', icon: Award }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                    selectedTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {selectedTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {/* Recent Activity */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {applications.slice(0, 3).map((app) => (
                        <div key={app.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{app.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{app.institution}</p>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                <span className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  Applied: {new Date(app.appliedDate).toLocaleDateString()}
                                </span>
                                <span className="flex items-center">
                                  <IndianRupee className="w-4 h-4 mr-1" />
                                  {app.amount.toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                              {getStatusIcon(app.status)}
                              <span className="ml-1">{formatStatus(app.status)}</span>
                            </span>
                          </div>
                          {app.progress > 0 && (
                            <div className="mt-3">
                              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                <span>Progress</span>
                                <span>{app.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${app.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Deadlines */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
                    <div className="space-y-3">
                      {upcomingDeadlines.map((deadline) => (
                        <div key={deadline.id} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{deadline.title}</h4>
                              <p className="text-sm text-gray-600">{deadline.program}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-orange-600">{deadline.daysLeft}</div>
                              <div className="text-xs text-gray-600">days left</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Student Level */}
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-purple-600" />
                      Current Level
                    </h3>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-2">{studentStats.currentLevel}</div>
                      <div className="text-sm text-gray-600 mb-4">Level 5 • 2,450 XP</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <div className="text-xs text-gray-500">750 XP to next level</div>
                    </div>
                  </div>

                  {/* Learning Streak */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Streak</h3>
                    <div className="text-center">
                      <div className="text-3xl mb-2">🔥</div>
                      <div className="text-2xl font-bold text-orange-600 mb-1">{studentStats.streak} Days</div>
                      <div className="text-sm text-gray-600">Keep it up!</div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full bg-blue-50 text-blue-700 py-2 px-4 rounded-lg font-medium hover:bg-blue-100 transition-colors text-left">
                        Browse New Scholarships
                      </button>
                      <button className="w-full bg-green-50 text-green-700 py-2 px-4 rounded-lg font-medium hover:bg-green-100 transition-colors text-left">
                        Update Profile
                      </button>
                      <button className="w-full bg-purple-50 text-purple-700 py-2 px-4 rounded-lg font-medium hover:bg-purple-100 transition-colors text-left">
                        View Certificates
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Applications Tab */}
            {selectedTab === 'applications' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">All Applications</h3>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="all">All Status</option>
                    <option value="applied">Applied</option>
                    <option value="shortlisted">In Progress</option>
                    <option value="funded">Completed</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {applications.map((app) => (
                    <div key={app.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{app.title}</h4>
                          <p className="text-sm text-gray-600">{app.institution}</p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                          <span className="ml-1">{formatStatus(app.status)}</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold text-green-600 flex items-center">
                          <IndianRupee className="w-4 h-4 mr-1" />
                          {app.amount.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500">
                          Applied: {new Date(app.appliedDate).toLocaleDateString()}
                        </span>
                      </div>

                      {app.progress > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                            <span>Progress</span>
                            <span>{app.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${app.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-50 text-blue-700 py-2 px-4 rounded-lg font-medium hover:bg-blue-100 transition-colors text-sm">
                          View Details
                        </button>
                        {app.status === 'funded' && (
                          <button className="flex-1 bg-green-50 text-green-700 py-2 px-4 rounded-lg font-medium hover:bg-green-100 transition-colors text-sm flex items-center justify-center">
                            <Download className="w-4 h-4 mr-1" />
                            Certificate
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Learning Progress Tab */}
            {selectedTab === 'progress' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Detailed Learning Progress</h3>
                
                {applications.filter(app => app.milestones.length > 0).map((app) => (
                  <div key={app.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">{app.title}</h4>
                      <span className="text-sm text-gray-500">{app.progress}% Complete</span>
                    </div>

                    <div className="space-y-4">
                      {app.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            milestone.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {milestone.completed ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className={`font-medium ${milestone.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                                {milestone.name}
                              </span>
                              {milestone.completed && milestone.date && (
                                <span className="text-sm text-gray-500">
                                  Completed: {new Date(milestone.date).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Achievements Tab */}
            {selectedTab === 'achievements' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Your Achievements</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6 text-center">
                      <div className="text-4xl mb-3">{achievement.icon}</div>
                      <h4 className="font-semibold text-gray-900 mb-2">{achievement.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{new Date(achievement.date).toLocaleDateString()}</span>
                        <span className="font-medium text-orange-600">+{achievement.points} XP</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgressView;