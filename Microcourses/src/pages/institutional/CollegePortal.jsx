import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { 
  GraduationCap,
  Users,
  Award,
  TrendingUp,
  PlusCircle,
  Search,
  Filter,
  Calendar,
  IndianRupee,
  CheckCircle,
  Clock,
  Eye,
  Edit3,
  BarChart3,
  FileText,
  Building
} from 'lucide-react';

const CollegePortal = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock college data
  const collegeStats = {
    totalStudents: 2450,
    activeScholarships: 12,
    studentsAwarded: 156,
    totalFunding: 1250000,
    partnerOrganizations: 8,
    successRate: 78
  };

  const scholarships = [
    {
      id: 1,
      title: 'Computer Science Excellence Program',
      sponsor: 'Tech Foundation',
      amount: 15000,
      slots: 20,
      applicants: 45,
      approved: 18,
      deadline: '2025-02-15',
      status: 'active',
      category: 'Technology',
      eligibility: 'CS students with 8.0+ CGPA'
    },
    {
      id: 2,
      title: 'Women in Engineering Scholarship',
      sponsor: 'Diversity Corp',
      amount: 12000,
      slots: 15,
      applicants: 32,
      approved: 12,
      deadline: '2025-02-28',
      status: 'active',
      category: 'Engineering',
      eligibility: 'Female engineering students'
    },
    {
      id: 3,
      title: 'Rural Development Research Grant',
      sponsor: 'Social Impact NGO',
      amount: 8000,
      slots: 10,
      applicants: 23,
      approved: 8,
      deadline: '2025-01-30',
      status: 'completed',
      category: 'Research',
      eligibility: 'Students from rural backgrounds'
    }
  ];

  const students = [
    {
      id: 1,
      name: 'Priya Sharma',
      rollNumber: 'CS2021001',
      department: 'Computer Science',
      year: '3rd Year',
      cgpa: 8.7,
      scholarshipsReceived: 3,
      totalEarned: 35000,
      status: 'active'
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      rollNumber: 'EE2021045',
      department: 'Electrical Engineering',
      year: '2nd Year',
      cgpa: 8.2,
      scholarshipsReceived: 2,
      totalEarned: 22000,
      status: 'active'
    },
    {
      id: 3,
      name: 'Anita Patel',
      rollNumber: 'ME2020078',
      department: 'Mechanical Engineering',
      year: '4th Year',
      cgpa: 9.1,
      scholarshipsReceived: 4,
      totalEarned: 48000,
      status: 'graduated'
    }
  ];

  const recentApplications = [
    {
      id: 1,
      studentName: 'Vikram Singh',
      scholarshipTitle: 'Computer Science Excellence Program',
      appliedDate: '2025-01-22',
      status: 'pending_verification',
      amount: 15000
    },
    {
      id: 2,
      studentName: 'Sneha Gupta',
      scholarshipTitle: 'Women in Engineering Scholarship',
      appliedDate: '2025-01-21',
      status: 'verified',
      amount: 12000
    },
    {
      id: 3,
      studentName: 'Arjun Mehta',
      scholarshipTitle: 'Rural Development Research Grant',
      appliedDate: '2025-01-20',
      status: 'approved',
      amount: 8000
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending_verification': return 'bg-yellow-100 text-yellow-800';
      case 'verified': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'graduated': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending_verification': return <Clock className="w-4 h-4" />;
      case 'verified': return <Eye className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const formatStatus = (status) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Building className="w-8 h-8 mr-3 text-blue-600" />
                Delhi University Portal
              </h1>
              <p className="text-gray-600">Manage scholarships and track student progress</p>
            </div>
            
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center space-x-2">
              <PlusCircle className="w-5 h-5" />
              <span>Create Scholarship</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{collegeStats.totalStudents.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Scholarships</p>
                <p className="text-2xl font-bold text-green-600">{collegeStats.activeScholarships}</p>
              </div>
              <Award className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Students Awarded</p>
                <p className="text-2xl font-bold text-purple-600">{collegeStats.studentsAwarded}</p>
              </div>
              <GraduationCap className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Funding</p>
                <p className="text-2xl font-bold text-orange-600 flex items-center">
                  <IndianRupee className="w-5 h-5 mr-1" />
                  {(collegeStats.totalFunding / 100000).toFixed(1)}L
                </p>
              </div>
              <IndianRupee className="w-8 h-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Partner Organizations</p>
                <p className="text-2xl font-bold text-pink-600">{collegeStats.partnerOrganizations}</p>
              </div>
              <Building className="w-8 h-8 text-pink-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-green-600">{collegeStats.successRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'scholarships', label: 'Scholarships', icon: Award },
                { id: 'students', label: 'Students', icon: Users },
                { id: 'applications', label: 'Applications', icon: FileText }
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
                  {/* Recent Scholarships */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Scholarships</h3>
                    <div className="space-y-4">
                      {scholarships.slice(0, 3).map((scholarship) => (
                        <div key={scholarship.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{scholarship.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">Sponsored by {scholarship.sponsor}</p>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                <span className="flex items-center">
                                  <IndianRupee className="w-4 h-4 mr-1" />
                                  {scholarship.amount.toLocaleString()}
                                </span>
                                <span>{scholarship.applicants} applicants</span>
                                <span>{scholarship.approved} approved</span>
                              </div>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(scholarship.status)}`}>
                              {getStatusIcon(scholarship.status)}
                              <span className="ml-1">{formatStatus(scholarship.status)}</span>
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
                            </span>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Applications */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h3>
                    <div className="space-y-3">
                      {recentApplications.map((application) => (
                        <div key={application.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{application.studentName}</p>
                            <p className="text-sm text-gray-600">{application.scholarshipTitle}</p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                              {formatStatus(application.status)}
                            </span>
                            <p className="text-sm text-gray-500 mt-1">
                              {new Date(application.appliedDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Department Performance */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Computer Science</span>
                        <span className="font-medium text-blue-600">45 awards</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Engineering</span>
                        <span className="font-medium text-green-600">38 awards</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Business</span>
                        <span className="font-medium text-purple-600">29 awards</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Sciences</span>
                        <span className="font-medium text-orange-600">22 awards</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full bg-blue-50 text-blue-700 py-2 px-4 rounded-lg font-medium hover:bg-blue-100 transition-colors text-left">
                        Verify Student Applications
                      </button>
                      <button className="w-full bg-green-50 text-green-700 py-2 px-4 rounded-lg font-medium hover:bg-green-100 transition-colors text-left">
                        Generate Reports
                      </button>
                      <button className="w-full bg-purple-50 text-purple-700 py-2 px-4 rounded-lg font-medium hover:bg-purple-100 transition-colors text-left">
                        Partner Management
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Scholarships Tab */}
            {selectedTab === 'scholarships' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Scholarship Programs</h3>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search scholarships..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="all">All Categories</option>
                      <option value="technology">Technology</option>
                      <option value="engineering">Engineering</option>
                      <option value="research">Research</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {scholarships.map((scholarship) => (
                    <div key={scholarship.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{scholarship.title}</h4>
                          <p className="text-sm text-gray-600">Sponsored by {scholarship.sponsor}</p>
                          <p className="text-xs text-gray-500 mt-1">{scholarship.eligibility}</p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(scholarship.status)}`}>
                          {formatStatus(scholarship.status)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center bg-gray-50 rounded-lg p-3">
                          <div className="text-lg font-bold text-green-600 flex items-center justify-center">
                            <IndianRupee className="w-4 h-4 mr-1" />
                            {scholarship.amount.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-600">Amount</div>
                        </div>
                        <div className="text-center bg-gray-50 rounded-lg p-3">
                          <div className="text-lg font-bold text-blue-600">{scholarship.applicants}</div>
                          <div className="text-xs text-gray-600">Applicants</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
                        <span>{scholarship.approved}/{scholarship.slots} approved</span>
                      </div>

                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-50 text-blue-700 py-2 px-4 rounded-lg font-medium hover:bg-blue-100 transition-colors text-sm flex items-center justify-center">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </button>
                        <button className="flex-1 bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm flex items-center justify-center">
                          <Edit3 className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Students Tab */}
            {selectedTab === 'students' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Student Directory</h3>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search students..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="all">All Departments</option>
                      <option value="cs">Computer Science</option>
                      <option value="ee">Electrical Engineering</option>
                      <option value="me">Mechanical Engineering</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CGPA</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scholarships</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Earned</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.rollNumber}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{student.department}</div>
                            <div className="text-sm text-gray-500">{student.year}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{student.cgpa}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-blue-600">{student.scholarshipsReceived}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-green-600 flex items-center">
                              <IndianRupee className="w-3 h-3 mr-1" />
                              {student.totalEarned.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                              {formatStatus(student.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                            <button className="text-green-600 hover:text-green-900">Verify</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Applications Tab */}
            {selectedTab === 'applications' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Application Management</h3>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="all">All Status</option>
                      <option value="pending">Pending Verification</option>
                      <option value="verified">Verified</option>
                      <option value="approved">Approved</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {recentApplications.map((application) => (
                    <div key={application.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{application.studentName}</h4>
                          <p className="text-sm text-gray-600 mt-1">{application.scholarshipTitle}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Applied: {new Date(application.appliedDate).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              <IndianRupee className="w-4 h-4 mr-1" />
                              {application.amount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                            {getStatusIcon(application.status)}
                            <span className="ml-1">{formatStatus(application.status)}</span>
                          </span>
                          
                          <div className="flex space-x-2">
                            <button className="bg-blue-50 text-blue-700 px-3 py-1 rounded text-sm font-medium hover:bg-blue-100 transition-colors">
                              Review
                            </button>
                            {application.status === 'pending_verification' && (
                              <button className="bg-green-50 text-green-700 px-3 py-1 rounded text-sm font-medium hover:bg-green-100 transition-colors">
                                Verify
                              </button>
                            )}
                          </div>
                        </div>
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

export default CollegePortal;