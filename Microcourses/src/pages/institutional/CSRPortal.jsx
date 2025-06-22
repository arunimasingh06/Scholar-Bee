import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { 
  Building,
  TrendingUp,
  Users,
  Award,
  IndianRupee,
  Target,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Eye,
  CheckCircle,
  Clock,
  Heart,
  Globe,
  Zap,
  Star
} from 'lucide-react';

const CSRPortal = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('quarterly');
  const [selectedMetric, setSelectedMetric] = useState('impact');

  // Mock CSR data
  const csrStats = {
    totalInvestment: 5000000,
    studentsImpacted: 1250,
    programsSupported: 25,
    completionRate: 87,
    socialROI: 4.2,
    carbonFootprintReduced: 150
  };

  const impactMetrics = [
    {
      category: 'Education & Skill Development',
      investment: 2500000,
      studentsImpacted: 750,
      programs: 15,
      outcomes: [
        'Average 45% salary increase post-completion',
        '92% job placement rate',
        '15 new tech startups launched'
      ],
      color: 'bg-blue-500'
    },
    {
      category: 'Rural Development',
      investment: 1500000,
      studentsImpacted: 300,
      programs: 6,
      outcomes: [
        '25 villages connected to digital literacy',
        '150 women entrepreneurs trained',
        '8 community centers established'
      ],
      color: 'bg-green-500'
    },
    {
      category: 'Healthcare & Wellness',
      investment: 1000000,
      studentsImpacted: 200,
      programs: 4,
      outcomes: [
        '50 healthcare workers certified',
        '10 mobile health units deployed',
        '5,000 people reached with health services'
      ],
      color: 'bg-purple-500'
    }
  ];

  const quarterlyData = [
    { quarter: 'Q1 2024', investment: 1200000, students: 280, programs: 6, satisfaction: 4.3 },
    { quarter: 'Q2 2024', investment: 1350000, students: 320, programs: 7, satisfaction: 4.5 },
    { quarter: 'Q3 2024', investment: 1100000, students: 250, programs: 5, satisfaction: 4.2 },
    { quarter: 'Q4 2024', investment: 1350000, students: 400, programs: 7, satisfaction: 4.6 }
  ];

  const sustainabilityMetrics = [
    {
      title: 'Carbon Footprint Reduction',
      value: '150 tons CO2',
      description: 'Through digital learning initiatives',
      icon: Globe,
      color: 'text-green-600'
    },
    {
      title: 'Digital Inclusion',
      value: '2,500 people',
      description: 'Gained access to digital tools',
      icon: Zap,
      color: 'text-blue-600'
    },
    {
      title: 'Gender Equality',
      value: '60% women',
      description: 'Participation in STEM programs',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Community Impact',
      value: '45 communities',
      description: 'Directly benefited from programs',
      icon: Heart,
      color: 'text-pink-600'
    }
  ];

  const recentPrograms = [
    {
      id: 1,
      title: 'Women in Technology Initiative',
      category: 'Education & Skill Development',
      investment: 500000,
      studentsEnrolled: 150,
      studentsCompleted: 142,
      startDate: '2024-01-15',
      endDate: '2024-06-15',
      status: 'completed',
      impact: 'Average 52% salary increase for participants'
    },
    {
      id: 2,
      title: 'Rural Digital Literacy Program',
      category: 'Rural Development',
      investment: 300000,
      studentsEnrolled: 200,
      studentsCompleted: 185,
      startDate: '2024-03-01',
      endDate: '2024-08-31',
      status: 'completed',
      impact: '15 villages now have digital literacy centers'
    },
    {
      id: 3,
      title: 'Healthcare Worker Certification',
      category: 'Healthcare & Wellness',
      investment: 250000,
      studentsEnrolled: 80,
      studentsCompleted: 0,
      startDate: '2024-10-01',
      endDate: '2025-03-31',
      status: 'ongoing',
      impact: 'Expected to train 75+ healthcare workers'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'planned': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'ongoing': return <Clock className="w-4 h-4" />;
      case 'planned': return <Calendar className="w-4 h-4" />;
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Building className="w-8 h-8 mr-3 text-blue-600" />
                CSR Impact Dashboard
              </h1>
              <p className="text-gray-600">Track your corporate social responsibility initiatives and their impact</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
              
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Investment</p>
                <p className="text-2xl font-bold text-blue-600 flex items-center">
                  <IndianRupee className="w-5 h-5 mr-1" />
                  {(csrStats.totalInvestment / 1000000).toFixed(1)}M
                </p>
              </div>
              <IndianRupee className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Students Impacted</p>
                <p className="text-2xl font-bold text-green-600">{csrStats.studentsImpacted.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Programs Supported</p>
                <p className="text-2xl font-bold text-purple-600">{csrStats.programsSupported}</p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-orange-600">{csrStats.completionRate}%</p>
              </div>
              <Target className="w-8 h-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Social ROI</p>
                <p className="text-2xl font-bold text-pink-600">{csrStats.socialROI}x</p>
              </div>
              <TrendingUp className="w-8 h-8 text-pink-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Satisfaction Score</p>
                <p className="text-2xl font-bold text-yellow-600 flex items-center">
                  4.5 <Star className="w-4 h-4 ml-1 fill-current" />
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Impact by Category */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-blue-600" />
              Impact by Category
            </h2>
            
            <div className="space-y-6">
              {impactMetrics.map((metric, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${metric.color}`}></div>
                      <h3 className="font-semibold text-gray-900">{metric.category}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600 flex items-center">
                        <IndianRupee className="w-4 h-4 mr-1" />
                        {(metric.investment / 100000).toFixed(1)}L
                      </div>
                      <div className="text-sm text-gray-600">{metric.studentsImpacted} students</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center bg-gray-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-gray-900">{metric.programs}</div>
                      <div className="text-xs text-gray-600">Programs</div>
                    </div>
                    <div className="text-center bg-gray-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-green-600">{metric.studentsImpacted}</div>
                      <div className="text-xs text-gray-600">Students</div>
                    </div>
                    <div className="text-center bg-gray-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-purple-600">
                        ₹{(metric.investment / metric.studentsImpacted).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600">Per Student</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Key Outcomes:</h4>
                    <ul className="space-y-1">
                      {metric.outcomes.map((outcome, outcomeIndex) => (
                        <li key={outcomeIndex} className="text-sm text-gray-600 flex items-start">
                          <CheckCircle className="w-3 h-3 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quarterly Performance & Sustainability */}
          <div className="space-y-8">
            {/* Quarterly Performance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
                Quarterly Performance
              </h3>
              
              <div className="space-y-4">
                {quarterlyData.map((quarter, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{quarter.quarter}</span>
                      <span className="text-sm text-gray-600 flex items-center">
                        <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                        {quarter.satisfaction}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">Investment:</span>
                        <div className="font-medium text-blue-600">₹{(quarter.investment / 100000).toFixed(1)}L</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Students:</span>
                        <div className="font-medium text-green-600">{quarter.students}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sustainability Metrics */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-green-600" />
                Sustainability Impact
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {sustainabilityMetrics.map((metric, index) => (
                  <div key={index} className="bg-white rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <metric.icon className={`w-5 h-5 ${metric.color}`} />
                      <span className="font-medium text-gray-900">{metric.title}</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900 mb-1">{metric.value}</div>
                    <div className="text-xs text-gray-600">{metric.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Programs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Programs</h2>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="impact">All Programs</option>
                <option value="education">Education & Skills</option>
                <option value="rural">Rural Development</option>
                <option value="healthcare">Healthcare</option>
              </select>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {recentPrograms.map((program) => (
                <div key={program.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{program.category}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center bg-gray-50 rounded-lg p-3">
                          <div className="text-lg font-bold text-blue-600 flex items-center justify-center">
                            <IndianRupee className="w-4 h-4 mr-1" />
                            {(program.investment / 100000).toFixed(1)}L
                          </div>
                          <div className="text-xs text-gray-600">Investment</div>
                        </div>
                        <div className="text-center bg-gray-50 rounded-lg p-3">
                          <div className="text-lg font-bold text-green-600">{program.studentsEnrolled}</div>
                          <div className="text-xs text-gray-600">Enrolled</div>
                        </div>
                        <div className="text-center bg-gray-50 rounded-lg p-3">
                          <div className="text-lg font-bold text-purple-600">{program.studentsCompleted}</div>
                          <div className="text-xs text-gray-600">Completed</div>
                        </div>
                        <div className="text-center bg-gray-50 rounded-lg p-3">
                          <div className="text-lg font-bold text-orange-600">
                            {program.studentsCompleted > 0 ? Math.round((program.studentsCompleted / program.studentsEnrolled) * 100) : 0}%
                          </div>
                          <div className="text-xs text-gray-600">Success Rate</div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <p className="text-sm font-medium text-blue-900 mb-1">Impact:</p>
                        <p className="text-sm text-blue-800">{program.impact}</p>
                      </div>
                    </div>
                    
                    <div className="ml-6 text-right">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(program.status)}`}>
                        {getStatusIcon(program.status)}
                        <span className="ml-1 capitalize">{program.status}</span>
                      </span>
                      <div className="text-sm text-gray-500 mt-2">
                        {new Date(program.startDate).toLocaleDateString()} - {new Date(program.endDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-blue-50 text-blue-700 py-2 px-4 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center justify-center">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </button>
                    <button className="flex-1 bg-green-50 text-green-700 py-2 px-4 rounded-lg font-medium hover:bg-green-100 transition-colors flex items-center justify-center">
                      <Download className="w-4 h-4 mr-1" />
                      Download Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSRPortal;