import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { 
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  FileText,
  TrendingUp,
  Activity,
  Shield,
  Database,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  Eye,
  XCircle,
  RefreshCw
} from 'lucide-react';

const AdminView = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);

  // Mock admin data
  const systemStats = {
    totalUsers: 15420,
    activeApplications: 1247,
    verificationBacklog: 89,
    fraudDetected: 12,
    systemUptime: 99.8,
    dailyTransactions: 234
  };

  const verificationQueue = [
    {
      id: 1,
      studentName: 'Priya Sharma',
      scholarshipTitle: 'Data Science Bootcamp',
      submissionType: 'Project Submission',
      submittedDate: '2025-01-22',
      priority: 'high',
      aiScore: 0.92,
      flagged: false,
      documents: ['project_report.pdf', 'code_repository.zip', 'presentation.pptx']
    },
    {
      id: 2,
      studentName: 'Rahul Kumar',
      scholarshipTitle: 'Web Development Course',
      submissionType: 'Certificate Upload',
      submittedDate: '2025-01-22',
      priority: 'medium',
      aiScore: 0.78,
      flagged: true,
      documents: ['certificate.pdf', 'portfolio_link.txt']
    },
    {
      id: 3,
      studentName: 'Anita Patel',
      scholarshipTitle: 'Community Service Project',
      submissionType: 'Impact Report',
      submittedDate: '2025-01-21',
      priority: 'low',
      aiScore: 0.95,
      flagged: false,
      documents: ['impact_report.pdf', 'photos.zip', 'testimonials.pdf']
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: 'security',
      title: 'Suspicious Activity Detected',
      description: 'Multiple applications from same IP address',
      severity: 'high',
      timestamp: '2025-01-22T10:30:00Z',
      resolved: false
    },
    {
      id: 2,
      type: 'system',
      title: 'Database Performance Warning',
      description: 'Query response time above threshold',
      severity: 'medium',
      timestamp: '2025-01-22T09:15:00Z',
      resolved: false
    },
    {
      id: 3,
      type: 'verification',
      title: 'AI Model Accuracy Drop',
      description: 'Document verification accuracy below 85%',
      severity: 'high',
      timestamp: '2025-01-22T08:45:00Z',
      resolved: true
    }
  ];

  const liveMetrics = [
    { label: 'Applications/Hour', value: 23, trend: 'up', change: '+12%' },
    { label: 'Verification Rate', value: 89, trend: 'down', change: '-3%' },
    { label: 'System Load', value: 67, trend: 'stable', change: '0%' },
    { label: 'Error Rate', value: 0.2, trend: 'down', change: '-0.1%' }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Application Approved',
      user: 'Priya Sharma',
      details: 'Python Programming Course - ₹1,000',
      timestamp: '2 minutes ago',
      type: 'approval'
    },
    {
      id: 2,
      action: 'Fraud Alert',
      user: 'System',
      details: 'Duplicate document detected in application #1247',
      timestamp: '5 minutes ago',
      type: 'alert'
    },
    {
      id: 3,
      action: 'Payment Processed',
      user: 'Rahul Kumar',
      details: 'Web Development Course - ₹1,500',
      timestamp: '8 minutes ago',
      type: 'payment'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-600 transform rotate-180" />;
      case 'stable': return <Activity className="w-4 h-4 text-gray-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Monitor system health, verification queue, and platform analytics</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* System Health Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{systemStats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Applications</p>
                <p className="text-2xl font-bold text-green-600">{systemStats.activeApplications}</p>
              </div>
              <FileText className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Verification Queue</p>
                <p className="text-2xl font-bold text-orange-600">{systemStats.verificationBacklog}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Fraud Detected</p>
                <p className="text-2xl font-bold text-red-600">{systemStats.fraudDetected}</p>
              </div>
              <Shield className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Uptime</p>
                <p className="text-2xl font-bold text-green-600">{systemStats.systemUptime}%</p>
              </div>
              <Database className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Daily Transactions</p>
                <p className="text-2xl font-bold text-purple-600">{systemStats.dailyTransactions}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: Activity },
                { id: 'verification', label: 'Verification Queue', icon: CheckCircle },
                { id: 'alerts', label: 'System Alerts', icon: AlertTriangle },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp }
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
                  {/* Live Metrics */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Live System Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {liveMetrics.map((metric, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">{metric.label}</span>
                            {getTrendIcon(metric.trend)}
                          </div>
                          <div className="flex items-baseline space-x-2 mt-2">
                            <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                            <span className={`text-sm font-medium ${
                              metric.trend === 'up' ? 'text-green-600' : 
                              metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {metric.change}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activities */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
                    <div className="space-y-3">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            activity.type === 'approval' ? 'bg-green-500' :
                            activity.type === 'alert' ? 'bg-red-500' : 'bg-blue-500'
                          }`}></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                            <p className="text-sm text-gray-600">{activity.details}</p>
                            <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* System Status */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                      System Status
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">API Services</span>
                        <span className="text-sm font-medium text-green-600">Operational</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Database</span>
                        <span className="text-sm font-medium text-green-600">Healthy</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Payment Gateway</span>
                        <span className="text-sm font-medium text-green-600">Active</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">AI Verification</span>
                        <span className="text-sm font-medium text-yellow-600">Degraded</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full bg-blue-50 text-blue-700 py-2 px-4 rounded-lg font-medium hover:bg-blue-100 transition-colors text-left">
                        Process Verification Queue
                      </button>
                      <button className="w-full bg-orange-50 text-orange-700 py-2 px-4 rounded-lg font-medium hover:bg-orange-100 transition-colors text-left">
                        Review Fraud Alerts
                      </button>
                      <button className="w-full bg-purple-50 text-purple-700 py-2 px-4 rounded-lg font-medium hover:bg-purple-100 transition-colors text-left">
                        Generate Reports
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Verification Queue Tab */}
            {selectedTab === 'verification' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Verification Queue ({verificationQueue.length})</h3>
                  <div className="flex items-center space-x-4">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="all">All Priorities</option>
                      <option value="high">High Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="low">Low Priority</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="all">All Types</option>
                      <option value="project">Project Submissions</option>
                      <option value="certificate">Certificates</option>
                      <option value="report">Reports</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {verificationQueue.map((item) => (
                    <div key={item.id} className={`border rounded-lg p-6 ${item.flagged ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{item.studentName}</h4>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                              {item.priority} priority
                            </span>
                            {item.flagged && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Flagged
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-1">{item.scholarshipTitle}</p>
                          <p className="text-sm text-gray-500">{item.submissionType} • Submitted {new Date(item.submittedDate).toLocaleDateString()}</p>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900 mb-1">AI Score</div>
                          <div className={`text-lg font-bold ${item.aiScore >= 0.9 ? 'text-green-600' : item.aiScore >= 0.7 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {(item.aiScore * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Documents ({item.documents.length})</p>
                        <div className="flex flex-wrap gap-2">
                          {item.documents.map((doc, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              <FileText className="w-3 h-3 mr-1" />
                              {doc}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                          <Eye className="w-4 h-4 mr-1" />
                          Review
                        </button>
                        <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </button>
                        <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center">
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* System Alerts Tab */}
            {selectedTab === 'alerts' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
                  <div className="flex items-center space-x-2">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="all">All Alerts</option>
                      <option value="unresolved">Unresolved</option>
                      <option value="high">High Severity</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className={`border rounded-lg p-6 ${getSeverityColor(alert.severity)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                              alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {alert.severity} severity
                            </span>
                            {alert.resolved && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Resolved
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-2">{alert.description}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(alert.timestamp).toLocaleString()}
                          </p>
                        </div>
                        
                        {!alert.resolved && (
                          <div className="flex space-x-2">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
                              Investigate
                            </button>
                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm">
                              Resolve
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {selectedTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Platform Analytics</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Application Processing Time</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Average Processing Time</span>
                        <span className="font-medium">2.3 days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Fastest Processing</span>
                        <span className="font-medium text-green-600">4 hours</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Slowest Processing</span>
                        <span className="font-medium text-red-600">7 days</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Verification Accuracy</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">AI Verification</span>
                        <span className="font-medium">87.5%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Human Review</span>
                        <span className="font-medium text-green-600">98.2%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">False Positives</span>
                        <span className="font-medium text-yellow-600">2.1%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminView;