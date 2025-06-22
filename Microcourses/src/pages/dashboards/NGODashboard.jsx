import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { 
  TrendingUp, 
  Users, 
  Award, 
  IndianRupee,
  Calendar,
  BarChart3,
  PieChart,
  Target,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Filter,
  ArrowUp,
  ArrowDown,
  Eye
} from 'lucide-react';

const NGODashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('applications');

  // Mock data for NGO analytics
  const stats = {
    totalApplications: 1247,
    approvedApplications: 892,
    totalFunded: 2850000,
    studentsImpacted: 756,
    averageROI: 4.2,
    completionRate: 87
  };

  const applicationTrends = [
    { month: 'Jan', applications: 89, approved: 67, funded: 245000 },
    { month: 'Feb', applications: 124, approved: 89, funded: 320000 },
    { month: 'Mar', applications: 156, approved: 112, funded: 410000 },
    { month: 'Apr', applications: 198, approved: 145, funded: 525000 },
    { month: 'May', applications: 234, approved: 178, funded: 640000 },
    { month: 'Jun', applications: 267, approved: 201, funded: 710000 }
  ];

  const impactMetrics = [
    {
      category: 'Technology',
      students: 234,
      completion: 92,
      avgSalaryIncrease: 45,
      color: 'bg-blue-500'
    },
    {
      category: 'Healthcare',
      students: 156,
      completion: 88,
      avgSalaryIncrease: 38,
      color: 'bg-green-500'
    },
    {
      category: 'Education',
      students: 189,
      completion: 85,
      avgSalaryIncrease: 32,
      color: 'bg-purple-500'
    },
    {
      category: 'Social Work',
      students: 177,
      completion: 90,
      avgSalaryIncrease: 28,
      color: 'bg-orange-500'
    }
  ];

  const recentApplications = [
    {
      id: 1,
      studentName: 'Priya Sharma',
      program: 'Data Science Bootcamp',
      amount: 15000,
      status: 'approved',
      submittedDate: '2025-01-20',
      institution: 'IIT Delhi',
      expectedROI: 4.8
    },
    {
      id: 2,
      studentName: 'Rahul Kumar',
      program: 'Full Stack Development',
      amount: 12000,
      status: 'pending',
      submittedDate: '2025-01-19',
      institution: 'Delhi University',
      expectedROI: 4.2
    },
    {
      id: 3,
      studentName: 'Anita Patel',
      program: 'Digital Marketing',
      amount: 8000,
      status: 'under_review',
      submittedDate: '2025-01-18',
      institution: 'Mumbai University',
      expectedROI: 3.9
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'under_review': return <Eye className="w-4 h-4" />;
      case 'rejected': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">NGO Impact Dashboard</h1>
              <p className="text-gray-600">Track application trends, ROI metrics, and student outcomes</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
                <option value="all">All Time</option>
              </select>
              
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalApplications.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+12% from last month</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approvedApplications}</p>
                <div className="flex items-center mt-1">
                  <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+8% approval rate</span>
                </div>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Funded</p>
                <p className="text-2xl font-bold text-purple-600 flex items-center">
                  <IndianRupee className="w-5 h-5 mr-1" />
                  {(stats.totalFunded / 100000).toFixed(1)}L
                </p>
                <div className="flex items-center mt-1">
                  <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+15% this quarter</span>
                </div>
              </div>
              <IndianRupee className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Students Impacted</p>
                <p className="text-2xl font-bold text-orange-600">{stats.studentsImpacted}</p>
                <div className="flex items-center mt-1">
                  <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+18% growth</span>
                </div>
              </div>
              <Award className="w-8 h-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average ROI</p>
                <p className="text-2xl font-bold text-blue-600">{stats.averageROI}x</p>
                <div className="flex items-center mt-1">
                  <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+0.3x improvement</span>
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-green-600">{stats.completionRate}%</p>
                <div className="flex items-center mt-1">
                  <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+3% this month</span>
                </div>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Application Trends Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                Application Trends
              </h2>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="applications">Applications</option>
                <option value="approved">Approved</option>
                <option value="funded">Funded Amount</option>
              </select>
            </div>
            
            <div className="space-y-4">
              {applicationTrends.map((trend, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 text-sm font-medium text-gray-600">{trend.month}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">
                        {selectedMetric === 'applications' && `${trend.applications} applications`}
                        {selectedMetric === 'approved' && `${trend.approved} approved`}
                        {selectedMetric === 'funded' && `₹${(trend.funded / 1000).toFixed(0)}K funded`}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedMetric === 'applications' && trend.applications}
                        {selectedMetric === 'approved' && trend.approved}
                        {selectedMetric === 'funded' && `₹${(trend.funded / 1000).toFixed(0)}K`}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${
                            selectedMetric === 'applications' ? (trend.applications / 300) * 100 :
                            selectedMetric === 'approved' ? (trend.approved / 250) * 100 :
                            (trend.funded / 800000) * 100
                          }%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Impact by Category */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-purple-600" />
              Impact by Category
            </h2>
            
            <div className="space-y-4">
              {impactMetrics.map((metric, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${metric.color}`}></div>
                      <span className="font-medium text-gray-900">{metric.category}</span>
                    </div>
                    <span className="text-sm text-gray-600">{metric.students} students</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Completion Rate:</span>
                      <div className="flex items-center mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2">
                          <div 
                            className={`${metric.color} h-1.5 rounded-full`}
                            style={{ width: `${metric.completion}%` }}
                          ></div>
                        </div>
                        <span className="font-medium text-gray-900">{metric.completion}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-gray-600">Avg Salary Increase:</span>
                      <div className="font-medium text-green-600 mt-1">+{metric.avgSalaryIncrease}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="under_review">Under Review</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected ROI</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{application.studentName}</div>
                        <div className="text-sm text-gray-500">{application.institution}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{application.program}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 flex items-center">
                        <IndianRupee className="w-3 h-3 mr-1" />
                        {application.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-blue-600">{application.expectedROI}x</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1 capitalize">{application.status.replace('_', ' ')}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(application.submittedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button className="text-green-600 hover:text-green-900">Approve</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;