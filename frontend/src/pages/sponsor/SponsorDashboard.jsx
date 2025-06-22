import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { 
  Award,
  Users, 
  TrendingUp, 
  IndianRupee,
  PlusCircle,
  Eye,
  Calendar,
  CheckCircle,
  Clock,
  Heart
} from 'lucide-react';

const SponsorDashboard= () => {
  // Mock data
  const stats = {
    totalDonated: 25000,
    studentsHelped: 15,
    activeScholarships: 4,
    completedScholarships: 8
  };

  const recentScholarships = [
    {
      id: 1,
      title: 'Python Programming Mastery',
      amount: 1000,
      applicants: 23,
      approved: 3,
      deadline: '2025-02-15',
      status: 'active'
    },
    {
      id: 2,
      title: 'Community Leadership Project',
      amount: 750,
      applicants: 15,
      approved: 2,
      deadline: '2025-02-28',
      status: 'active'
    },
    {
      id: 3,
      title: 'Data Science Certification',
      amount: 1200,
      applicants: 8,
      approved: 1,
      deadline: '2025-01-30',
      status: 'completed'
    }
  ];

  const recentApplications = [
    {
      id: 1,
      studentName: 'Priya Sharma',
      scholarshipTitle: 'Python Programming Mastery',
      appliedDate: '2025-01-22',
      status: 'pending',
      gpa: '8.7 CGPA',
      institution: 'IIT Delhi'
    },
    {
      id: 2,
      studentName: 'Rahul Kumar',
      scholarshipTitle: 'Community Leadership Project',
      appliedDate: '2025-01-21',
      status: 'approved',
      gpa: '9.1 CGPA',
      institution: 'Delhi University'
    },
    {
      id: 3,
      studentName: 'Anita Patel',
      scholarshipTitle: 'Data Science Certification',
      appliedDate: '2025-01-20',
      status: 'in_review',
      gpa: '8.9 CGPA',
      institution: 'Mumbai University'
    }
  ];

  const impactMetrics = [
    { label: 'Students Graduated', value: 12, icon: '🎓' },
    { label: 'Skills Developed', value: 45, icon: '💡' },
    { label: 'Projects Completed', value: 28, icon: '🚀' },
    { label: 'Communities Impacted', value: 8, icon: '🌟' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'in_review': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Tech Foundation! 👋</h1>
          <p className="text-gray-600">Track your impact and manage scholarships to empower the next generation of learners.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Donated</p>
                <p className="text-2xl font-bold text-purple-600 flex items-center">
                  <IndianRupee className="w-5 h-5 mr-1" />
                  {stats.totalDonated.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Students Helped</p>
                <p className="text-2xl font-bold text-blue-600">{stats.studentsHelped}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Scholarships</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeScholarships}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-orange-600">{stats.completedScholarships}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Ready to make a difference?</h2>
              <p className="text-purple-100">Create a new scholarship and help students achieve their learning goals.</p>
            </div>
            <Link
              to="/sponsor/create"
              className="mt-4 md:mt-0 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center space-x-2"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Create Scholarship</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Scholarships */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-purple-600" />
                    My Scholarships
                  </h2>
                  <Link
                    to="/sponsor/scholarships"
                    className="text-purple-600 hover:text-purple-800 font-medium text-sm"
                  >
                    View All
                  </Link>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {recentScholarships.map((scholarship) => (
                    <div key={scholarship.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{scholarship.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <IndianRupee className="w-4 h-4 mr-1" />
                              {scholarship.amount.toLocaleString()}
                            </span>
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {scholarship.applicants} applicants
                            </span>
                            <span className="flex items-center">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              {scholarship.approved} approved
                            </span>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(scholarship.status)}`}>
                          {scholarship.status === 'active' ? 'Active' : 'Completed'}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
                        </span>
                        <Link
                          to={`/sponsor/applications/${scholarship.id}`}
                          className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Applications
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Applications & Impact */}
          <div className="lg:col-span-1 space-y-6">
            {/* Recent Applications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {recentApplications.map((application) => (
                    <div key={application.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{application.studentName}</p>
                        <p className="text-xs text-gray-600 mb-1">{application.scholarshipTitle}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{application.institution}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                            {application.status === 'in_review' ? 'In Review' : application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-green-600" />
                Your Impact
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {impactMetrics.map((metric, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl mb-1">{metric.icon}</div>
                    <div className="text-xl font-bold text-gray-900">{metric.value}</div>
                    <div className="text-xs text-gray-600">{metric.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-green-200">
                <p className="text-sm text-gray-700 text-center">
                  <strong>Thank you!</strong> Your contributions have made a real difference in students' lives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorDashboard;