import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { publicAPI, studentAPI } from '../../services/api';
import { 
  Award, 
  Upload, 
  FileText, 
  Clock, 
  IndianRupee, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';

const ScholarshipApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scholarship, setScholarship] = useState(null);
  const [formData, setFormData] = useState({
    essay: '',
    motivation: '',
    projectPlan: '',
    timeline: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    async function fetchScholarship() {
      try {
        setLoading(true);
        console.log('🔍 Looking for scholarship with ID:', id);
        // Fetch scholarship details from the public API
        const response = await publicAPI.getAvailableScholarships();
        console.log('📋 Available scholarships:', response.scholarships.map(s => ({ id: s.id, title: s.title })));
        const foundScholarship = response.scholarships.find(s => s.id === id);
        console.log('✅ Found scholarship:', foundScholarship);
        if (foundScholarship) {
          setScholarship({
            id: foundScholarship.id,
            title: foundScholarship.title,
            amount: foundScholarship.amount,
            deadline: foundScholarship.deadline,
            category: foundScholarship.category,
            difficulty: foundScholarship.difficulty || 'Beginner',
            description: foundScholarship.description,
            requirements: [
              'Complete the required coursework',
              'Submit a final project',
              'Provide proof of completion',
              'Write a detailed essay'
            ],
            submissionGuidelines: [
              'All documents must be in PDF format',
              'Project must be original work',
              'Essay must be plagiarism-free',
              'Submit before the deadline'
            ]
          });
        } else {
          alert('Scholarship not found');
          navigate('/student/dashboard');
        }
      } catch (error) {
        console.error('Error fetching scholarship:', error);
        alert('Failed to load scholarship details');
        navigate('/student/dashboard');
      } finally {
        setLoading(false);
      }
    }
    
    if (id) {
      fetchScholarship();
    }
  }, [id, navigate]);

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const fileNames = Array.from(files).map(file => file.name);
      setUploadedFiles(prev => [...prev, ...fileNames]);
    }
  };

  const removeFile = (fileName) => {
    setUploadedFiles(prev => prev.filter(file => file !== fileName));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare application data
      const applicationData = {
        essay: formData.essay,
        motivation: formData.motivation || formData.essay, // Use essay as motivation if not provided
        projectPlan: formData.projectPlan,
        timeline: formData.timeline,
        documents: uploadedFiles,
        amount: scholarship.amount
      };

      console.log('📤 Submitting application data:', applicationData);
      console.log('🎯 Scholarship ID:', scholarship.id);

      // Submit application to backend using studentAPI
      await studentAPI.applyForScholarship(scholarship.id, applicationData);

      // Show success and redirect
      alert('Application submitted successfully! You will receive a confirmation email shortly.');
      navigate('/student/applications');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const daysUntilDeadline = Math.ceil(
    (new Date(scholarship.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Scholarship Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-3">
                <Award className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  {scholarship.category}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">{scholarship.title}</h1>
              <p className="text-gray-600 mb-4">{scholarship.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 text-sm">
                  <IndianRupee className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-green-600">₹{scholarship.amount.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Due {new Date(scholarship.deadline).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-orange-600 font-medium">{daysUntilDeadline} days left</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">₹{scholarship.amount.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Reward Amount</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Application Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Application Form
              </h2>

              <div className="space-y-6">
                {/* Essay */}
                <div>
                  <label htmlFor="essay" className="block text-sm font-medium text-gray-700 mb-2">
                    Learning Essay *
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Write a 500-word essay about what you hope to learn and how this scholarship will help you.
                  </p>
                  <textarea
                    id="essay"
                    name="essay"
                    rows={6}
                    required
                    value={formData.essay}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Describe your learning goals, motivations, and how completing this Python course will benefit your career..."
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {formData.essay.split(' ').filter(word => word.length > 0).length} / 500 words
                  </div>
                </div>

                {/* Project Plan */}
                <div>
                  <label htmlFor="projectPlan" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Plan *
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Describe the final project you plan to create as part of your Python learning journey.
                  </p>
                  <textarea
                    id="projectPlan"
                    name="projectPlan"
                    rows={4}
                    required
                    value={formData.projectPlan}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Outline your project idea, technologies you'll use, expected outcomes..."
                  />
                </div>

                {/* Timeline */}
                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                    Learning Timeline *
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Provide a realistic timeline for completing the course and project.
                  </p>
                  <textarea
                    id="timeline"
                    name="timeline"
                    rows={3}
                    required
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Week 1-2: Basic Python syntax, Week 3-4: Data structures..."
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supporting Documents
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Upload any relevant certificates, transcripts, or portfolio items (PDF format preferred).
                  </p>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      <label htmlFor="file-upload" className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
                        Click to upload
                      </label> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF, DOC, or DOCX (max 10MB)</p>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>

                  {/* Uploaded Files */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {uploadedFiles.map((fileName, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">{fileName}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(fileName)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the terms and conditions and confirm that all information provided is accurate and original. 
                      I understand that plagiarism or false information will result in disqualification.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={() => navigate('/student/dashboard')}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Requirements Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Requirements
              </h3>
              <ul className="space-y-3">
                {scholarship.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Guidelines */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
                Submission Guidelines
              </h3>
              <ul className="space-y-3">
                {scholarship.submissionGuidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{guideline}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deadline Reminder */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-red-600" />
                Deadline Reminder
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                Applications must be submitted by <strong>{new Date(scholarship.deadline).toLocaleDateString()}</strong>
              </p>
              <div className="bg-white rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-red-600">{daysUntilDeadline}</div>
                <div className="text-xs text-gray-600">days remaining</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipApplication;