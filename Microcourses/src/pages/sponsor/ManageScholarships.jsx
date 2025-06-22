import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { 
  Award,
  PlusCircle,
  Search,
  Filter,
  Edit3,
  Users,
  Calendar,
  IndianRupee,
  Eye,
  MoreVertical,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle
} from 'lucide-react';

const ManageScholarships = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock scholarships data
  const scholarships = [
    {
      id: 1,
      title: 'Complete Python Programming Course',
      description: 'Complete a comprehensive Python programming course and submit your final project.',
      category: 'Programming',
      amount: 1000,
      numberOfAwards: 5,
      totalBudget: 5000,
      deadline: '2025-02-15',
      createdDate: '2025-01-10',
      status: 'active',
      applicants: 23,
      approved: 3,
      rejected: 2,
      pending: 18,
      tags: ['Python', 'Programming', 'Beginner']
    },
    {
      id: 2,
      title: 'Community Leadership Project',
      description: 'Lead a community service project that benefits at least 50 people in your local area.',
      category: 'Social Impact',
      amount: 750,
      numberOfAwards: 8,
      totalBudget: 6000,
      deadline: '2025-02-28',
      createdDate: '2025-01-08',
      status: 'active',
      applicants: 15,
      approved: 2,
      rejected: 1,
      pending: 12,
      tags: ['Community', 'Leadership', 'Social Impact']
    },
    {
      id: 3,
      title: 'Data Science Certification',
      description: 'Complete a recognized data science certification and submit a capstone project.',
      category: 'Data Science',
      amount: 1200,
      numberOfAwards: 3,
      totalBudget: 3600,
      deadline: '2025-01-30',
      createdDate: '2024-12-15',
      status: 'completed',
      applicants: 8,
      approved: 3,
      rejected: 2,
      pending: 0,
      tags: ['Data Science', 'Analytics', 'Certification']
    },
    {
      id: 4,
      title: 'Digital Marketing Campaign',
      description: 'Create and execute a digital marketing campaign for a local business or NGO.',
      category: 'Marketing',
      amount: 800,
      numberOfAwards: 6,
      totalBudget: 4800,
      deadline: '2025-02-20',
      createdDate: '2025-01-05',
      status: 'active',
      applicants: 34,
      approved: 1,
      rejected: 3,
      pending: 30,
      tags: ['Marketing', 'Digital', 'Campaign']
    },
    {
      id: 5,
      title: 'Environmental Awareness Initiative',
      description: 'Organize an environmental awareness program in your community.',
      category: 'Social Impact',
      amount: 600,
      numberOfAwards: 10,
      totalBudget: 6000,
      deadline: '2025-01-25',
      createdDate: '2024-12-20',
      status: 'closed',
      applicants: 12,
      approved: 5,
      rejected: 4,
      pending: 0,
      tags: ['Environment', 'Community', 'Awareness']
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <XCircle className="w-4 h-4" />;
      case 'draft': return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || scholarship.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || scholarship.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    total: scholarships.length,
    active: scholarships.filter(s => s.status === 'active').length,
    completed: scholarships.filter(s => s.status === 'completed').length,
    totalBudget: scholarships.reduce((sum, s) => sum + s.totalBudget, 0),
    totalApplicants: scholarships.reduce((sum, s) => sum + s.applicants, 0)
  };

  const categories = ['Programming', 'Data Science', 'Marketing', 'Social Impact', 'Design', 'Business'];

  const getDaysUntilDeadline = (deadline) => {
    const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Scholarships</h1>
              <p className="text-gray-600">Track and manage all your scholarship programs</p>
            </div>
            <Link
              to="/sponsor/create"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center space-x-2"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Create New Scholarship</span>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Scholarships</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-purple-600 flex items-center">
                  <IndianRupee className="w-5 h-5 mr-1" />
                  {(stats.totalBudget / 1000).toFixed(0)}K
                </p>
              </div>
              <IndianRupee className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applicants</p>
                <p className="text-2xl font-bold text-orange-600">{stats.totalApplicants}</p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search scholarships..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="closed">Closed</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredScholarships.map((scholarship) => (
            <div key={scholarship.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 hover:border-purple-300">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {scholarship.title}
                    </h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(scholarship.status)}`}>
                      {getStatusIcon(scholarship.status)}
                      <span className="ml-1 capitalize">{scholarship.status}</span>
                    </span>
                  </div>
                  <div className="relative">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{scholarship.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {scholarship.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center bg-gray-50 rounded-lg p-3">
                    <div className="text-xl font-bold text-green-600 flex items-center justify-center">
                      <IndianRupee className="w-4 h-4 mr-1" />
                      {scholarship.amount.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600">Per Student</div>
                  </div>
                  <div className="text-center bg-gray-50 rounded-lg p-3">
                    <div className="text-xl font-bold text-blue-600">{scholarship.applicants}</div>
                    <div className="text-xs text-gray-600">Applicants</div>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Applications Progress</span>
                    <span>{scholarship.approved}/{scholarship.numberOfAwards} approved</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(scholarship.approved / scholarship.numberOfAwards) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Deadline */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {scholarship.status === 'active' ? 'Deadline:' : 'Ended:'} {new Date(scholarship.deadline).toLocaleDateString()}
                  </span>
                  {scholarship.status === 'active' && (
                    <span className={`font-medium ${
                      getDaysUntilDeadline(scholarship.deadline) <= 7 ? 'text-red-600' : 
                      getDaysUntilDeadline(scholarship.deadline) <= 14 ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      {getDaysUntilDeadline(scholarship.deadline)} days left
                    </span>
                  )}
                </div>

                {/* Application Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center">
                    <div className="text-sm font-medium text-green-600">{scholarship.approved}</div>
                    <div className="text-xs text-gray-500">Approved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-yellow-600">{scholarship.pending}</div>
                    <div className="text-xs text-gray-500">Pending</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-red-600">{scholarship.rejected}</div>
                    <div className="text-xs text-gray-500">Rejected</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link
                    to={`/sponsor/applications/${scholarship.id}`}
                    className="flex-1 bg-purple-50 text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-purple-100 transition-colors text-center flex items-center justify-center space-x-1"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Applications</span>
                  </Link>
                  <button className="flex-1 bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-1">
                    <Edit3 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredScholarships.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No scholarships found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== 'all' || filterCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'You haven\'t created any scholarships yet. Create your first scholarship to get started.'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && filterCategory === 'all' && (
              <Link
                to="/sponsor/create"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 space-x-2"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Create Your First Scholarship</span>
              </Link>
            )}
          </div>
        )}

        {/* Pagination (if needed for large datasets) */}
        {filteredScholarships.length > 0 && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-3 py-2 text-sm text-white bg-purple-600 border border-purple-600 rounded-lg">
                1
              </button>
              <button className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                3
              </button>
              <button className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageScholarships;