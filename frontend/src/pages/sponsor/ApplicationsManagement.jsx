import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { sponsorAPI } from '../../services/api';
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
  MapPin,
  Loader,
  AlertCircle
} from 'lucide-react';

const ApplicationsManagement = () => {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scholarship, setScholarship] = useState(null);
  const [applications, setApplications] = useState([]);

  // Fetch scholarship and applications data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch scholarship details and applications
        const response = await sponsorAPI.getScholarshipApplications(id);
        
        setScholarship(response.scholarship);
        setApplications(response.applications);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError('Failed to load applications');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

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

  const handleApprove = async (applicationId) => {
    try {
      // Approve the application using the API
      await sponsorAPI.decideApplication(applicationId, { status: 'approved' });
      
      alert(`Application ${applicationId} approved! ₹${scholarship.amount} has been credited to the student's wallet.`);
      
      // Refresh the data to show updated status
      const response = await sponsorAPI.getScholarshipApplications(id);
      setScholarship(response.scholarship);
      setApplications(response.applications);
    } catch (error) {
      console.error('Error approving application:', error);
      alert(`Failed to approve application: ${error.message}`);
    }
  };

  const handleReject = async (applicationId) => {
    try {
      // Reject the application using the API
      await sponsorAPI.decideApplication(applicationId, { status: 'rejected' });
      
      alert(`Application ${applicationId} rejected.`);
      
      // Refresh the data to show updated status
      const response = await sponsorAPI.getScholarshipApplications(id);
      setScholarship(response.scholarship);
      setApplications(response.applications);
    } catch (error) {
      console.error('Error rejecting application:', error);
      alert(`Failed to reject application: ${error.message}`);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // No scholarship found
  if (!scholarship) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600">Scholarship not found</p>
          </div>
        </div>
      </div>
    );
  }

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