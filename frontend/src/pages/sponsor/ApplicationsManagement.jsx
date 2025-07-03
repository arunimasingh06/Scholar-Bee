import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { 
  ArrowLeft,
  User,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  FileText,
  Calendar,
  Award,
  IndianRupee,
  Mail,
  Phone,
  GraduationCap,
  MapPin
} from 'lucide-react';

const ApplicationsManagement = () => {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Mock scholarship data
  const scholarship = {
    id: 1,
    title: 'Complete Python Programming Course',
    amount: 1000,
    numberOfAwards: 5,
    deadline: '2025-02-15',
    description: 'Complete a comprehensive Python programming course and submit your final project.',
    requirements: [
      'Complete at least 40 hours of Python programming coursework',
      'Submit a final project demonstrating core Python concepts',
      'Provide certificates or proof of course completion',
      'Write a 500-word essay on what you learned'
    ]
  };

  // Mock applications data
  const applications = [
    {
      id: 1,
      student: {
        name: 'Priya Sharma',
        email: 'priya.sharma@email.com',
        phone: '+91 9876543210',
        profileImage: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        institution: 'IIT Delhi',
        course: 'Computer Science',
        year: '3rd Year',
        gpa: '8.7 CGPA',
        city: 'Delhi'
      },
      appliedDate: '2025-01-22',
      status: 'pending',
      essay: 'I am passionate about learning Python programming because it opens up countless opportunities in software development, data science, and automation. Through this scholarship, I aim to build a strong foundation in Python that will help me contribute to open-source projects and eventually develop applications that solve real-world problems in my community.',
      projectPlan: 'I plan to create a web-based expense tracker application using Python Flask framework. The project will include user authentication, expense categorization, budget tracking, and visual reports using charts. This will demonstrate my understanding of Python basics, web development, database integration, and UI/UX design.',
      timeline: 'Week 1-2: Python basics and syntax, Week 3-4: Data structures and algorithms, Week 5-6: Web development with Flask, Week 7-8: Final project development and testing.',
      documents: ['Python_Basics_Certificate.pdf', 'Previous_Projects_Portfolio.pdf', 'Academic_Transcript.pdf'],
      submittedAt: '2025-01-22T10:30:00Z'
    },
    {
      id: 2,
      student: {
        name: 'Rahul Kumar',
        email: 'rahul.kumar@email.com',
        phone: '+91 9876543211',
        profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        institution: 'Delhi University',
        course: 'Information Technology',
        year: '2nd Year',
        gpa: '9.1 CGPA',
        city: 'Delhi'
      },
      appliedDate: '2025-01-21',
      status: 'approved',
      essay: 'Python has become essential in today\'s technology landscape. I want to master it to pursue a career in machine learning and artificial intelligence. This scholarship will enable me to access quality courses and dedicate time to learning without financial stress.',
      projectPlan: 'I will develop a machine learning model for predicting crop yields based on weather data. The project will use Python libraries like pandas, scikit-learn, and matplotlib to analyze agricultural data and provide insights to farmers.',
      timeline: 'Week 1-3: Python fundamentals and data manipulation, Week 4-6: Machine learning concepts and libraries, Week 7-8: Project development and documentation.',
      documents: ['Academic_Records.pdf', 'Programming_Experience.pdf'],
      submittedAt: '2025-01-21T14:15:00Z',
      reviewNotes: 'Excellent project proposal with clear social impact. Strong academic background and relevant experience.',
      reviewedAt: '2025-01-25T09:00:00Z'
    },
    {
      id: 3,
      student: {
        name: 'Anita Patel',
        email: 'anita.patel@email.com',
        phone: '+91 9876543212',
        profileImage: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        institution: 'Mumbai University',
        course: 'Computer Engineering',
        year: '4th Year',
        gpa: '8.9 CGPA',
        city: 'Mumbai'
      },
      appliedDate: '2025-01-20',
      status: 'in_review',
      essay: 'As a final year student, I believe mastering Python will give me a competitive edge in the job market. I am particularly interested in using Python for automation and data analysis to improve business processes.',
      projectPlan: 'I will create an automated testing framework for web applications using Python and Selenium. This project will help businesses ensure their web applications work correctly and save time on manual testing.',
      timeline: 'Week 1-2: Advanced Python concepts, Week 3-5: Selenium and testing frameworks, Week 6-8: Building and documenting the testing framework.',
      documents: ['Resume.pdf', 'Project_Portfolio.pdf', 'Recommendation_Letter.pdf'],
      submittedAt: '2025-01-20T16:45:00Z'
    },
    {
      id: 4,
      student: {
        name: 'Vikram Singh',
        email: 'vikram.singh@email.com',
        phone: '+91 9876543213',
        profileImage: null,
        institution: 'Pune University',
        course: 'Software Engineering',
        year: '1st Year',
        gpa: '8.2 CGPA',
        city: 'Pune'
      },
      appliedDate: '2025-01-19',
      status: 'rejected',
      essay: 'I want to learn Python to build websites and mobile apps.',
      projectPlan: 'I will make a simple calculator app.',
      timeline: 'I will learn Python in 4 weeks.',
      documents: ['ID_Proof.pdf'],
      submittedAt: '2025-01-19T11:20:00Z',
      reviewNotes: 'Application lacks detail and depth. Project scope is too narrow for the scholarship requirements. Encourage reapplication with more comprehensive approach.',
      reviewedAt: '2025-01-24T13:30:00Z'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_review': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'in_review': return <Eye className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const formatStatus = (status) => {
    switch (status) {
      case 'in_review': return 'In Review';
      default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const filteredApplications = applications.filter(app => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'pending') return app.status === 'pending' || app.status === 'in_review';
    return app.status === selectedTab;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending' || app.status === 'in_review').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length
  };

  const handleApprove = (applicationId) => {
    // Handle approval logic
    alert(`Application ${applicationId} approved! Payment will be processed.`);
  };

  const handleReject = (applicationId) => {
    // Handle rejection logic
    alert(`Application ${applicationId} rejected.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              to="/sponsor/scholarships"
              className="flex items-center text-purple-600 hover:text-purple-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Scholarships
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{scholarship.title}</h1>
                <p className="text-gray-600 mb-4">{scholarship.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <IndianRupee className="w-4 h-4 mr-1" />
                    ₹{scholarship.amount.toLocaleString()} per student
                  </span>
                  <span className="flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    {scholarship.numberOfAwards} awards available
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200 text-center">
                <div className="text-xl font-bold text-purple-600">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Applications</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <FileText className="w-8 h-8 text-gray-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Applications List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'all', label: 'All', count: stats.total },
                    { id: 'pending', label: 'Pending', count: stats.pending },
                    { id: 'approved', label: 'Approved', count: stats.approved },
                    { id: 'rejected', label: 'Rejected', count: stats.rejected }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        selectedTab === tab.id
                          ? 'border-purple-500 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label} ({tab.count})
                    </button>
                  ))}
                </nav>
              </div>

              {/* Applications */}
              <div className="divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <div key={application.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-4">
                      {/* Student Avatar */}
                      <div className="flex-shrink-0">
                        {application.student.profileImage ? (
                          <img
                            src={application.student.profileImage}
                            alt={application.student.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-gray-600" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{application.student.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center">
                                <GraduationCap className="w-4 h-4 mr-1" />
                                {application.student.institution}
                              </span>
                              <span className="flex items-center">
                                <Award className="w-4 h-4 mr-1" />
                                {application.student.gpa}
                              </span>
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {application.student.city}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
                              {getStatusIcon(application.status)}
                              <span className="ml-1">{formatStatus(application.status)}</span>
                            </span>
                          </div>
                        </div>

                        <div className="mt-3">
                          <p className="text-sm text-gray-600 line-clamp-2">{application.essay}</p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                            <span>{application.documents.length} documents</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setSelectedApplication(application.id)}
                              className="px-3 py-1 text-xs font-medium text-purple-600 bg-purple-50 border border-purple-200 rounded-md hover:bg-purple-100 transition-colors"
                            >
                              View Details
                            </button>
                            
                            {application.status === 'pending' || application.status === 'in_review' ? (
                              <div className="flex space-x-1">
                                <button
                                  onClick={() => handleApprove(application.id)}
                                  className="px-3 py-1 text-xs font-medium text-green-600 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-colors"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleReject(application.id)}
                                  className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
                                >
                                  Reject
                                </button>
                              </div>
                            ) : (
                              <span className="text-xs text-gray-500">
                                {application.status === 'approved' ? 'Approved' : 'Rejected'} on{' '}
                                {application.reviewedAt && new Date(application.reviewedAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Review Notes */}
                        {application.reviewNotes && (
                          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm font-medium text-blue-900 mb-1">Review Notes:</p>
                            <p className="text-sm text-blue-800">{application.reviewNotes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredApplications.length === 0 && (
                <div className="p-12 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
                  <p className="text-gray-600">
                    {selectedTab === 'all' 
                      ? 'No applications have been submitted yet.'
                      : `No ${selectedTab} applications found.`
                    }
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Application Details Sidebar */}
          <div className="lg:col-span-1">
            {selectedApplication ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                {(() => {
                  const app = applications.find(a => a.id === selectedApplication);
                  if (!app) return null;

                  return (
                    <div className="space-y-6">
                      <div className="text-center">
                        {app.student.profileImage ? (
                          <img
                            src={app.student.profileImage}
                            alt={app.student.name}
                            className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-10 h-10 text-gray-600" />
                          </div>
                        )}
                        <h3 className="text-lg font-semibold text-gray-900">{app.student.name}</h3>
                        <p className="text-gray-600">{app.student.course}, {app.student.year}</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center text-gray-600">
                              <Mail className="w-4 h-4 mr-2" />
                              {app.student.email}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Phone className="w-4 h-4 mr-2" />
                              {app.student.phone}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <GraduationCap className="w-4 h-4 mr-2" />
                              {app.student.institution}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Essay</h4>
                          <p className="text-sm text-gray-600">{app.essay}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Project Plan</h4>
                          <p className="text-sm text-gray-600">{app.projectPlan}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Timeline</h4>
                          <p className="text-sm text-gray-600">{app.timeline}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Documents</h4>
                          <div className="space-y-2">
                            {app.documents.map((doc, index) => (
                              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                <span className="text-sm text-gray-700">{doc}</span>
                                <button className="text-blue-600 hover:text-blue-800">
                                  <Download className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {app.status === 'pending' || app.status === 'in_review' ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApprove(app.id)}
                              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(app.id)}
                              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <div className={`p-3 rounded-lg border ${getStatusColor(app.status)}`}>
                            <div className="flex items-center">
                              {getStatusIcon(app.status)}
                              <span className="ml-2 font-medium">{formatStatus(app.status)}</span>
                            </div>
                            {app.reviewNotes && (
                              <p className="text-sm mt-2">{app.reviewNotes}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Application</h3>
                <p className="text-gray-600">Click on any application to view detailed information and take action.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsManagement;