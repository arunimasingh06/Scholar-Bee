import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  GraduationCap, 
  Edit3, 
  Save, 
  Upload,
  Award,
  Star,
  CheckCircle
} from 'lucide-react';

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'Ujjwal Kumar',
    email: 'ujjwal.kumar@email.com',
    phone: '+91 9876543210',
    dateOfBirth: '2000-05-15',
    gender: 'Male',
    city: 'Delhi',
    state: 'Delhi',
    educationLevel: 'Undergraduate',
    institution: 'Delhi University',
    course: 'Computer Science',
    year: '3rd Year',
    gpa: '8.5 CGPA',
    familyIncome: '2-5lakh',
    interests: 'Web Development, Machine Learning, Community Service',
    bio: 'Passionate computer science student with a keen interest in technology and social impact. Always eager to learn new skills and contribute to meaningful projects.'
  });

  const achievements = [
    {
      id: 1,
      title: 'Python Programming Expert',
      date: '2025-01-15',
      amount: 1000,
      badge: 'Expert'
    },
    {
      id: 2,
      title: 'Community Impact Leader',
      date: '2025-01-10',
      amount: 750,
      badge: 'Leader'
    },
    {
      id: 3,
      title: 'Data Science Fundamentals',
      date: '2024-12-20',
      amount: 500,
      badge: 'Certified'
    }
  ];

  const handleInputChange = (e) => {
    setProfileData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the data to your backend
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                  <Upload className="w-4 h-4" />
                </button>
              </div>
              
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl font-bold text-white">{profileData.fullName}</h1>
                <p className="text-blue-100">{profileData.course} • {profileData.institution}</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                  <div className="bg-white/20 text-white px-3 py-1 rounded-full text-sm flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Level 5 Learner
                  </div>
                  <div className="bg-white/20 text-white px-3 py-1 rounded-full text-sm flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    8 Achievements
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Information */}
              <div className="lg:col-span-2 space-y-8">
                {/* Personal Information */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    Personal Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="fullName"
                          value={profileData.fullName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{profileData.fullName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          {profileData.email}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          {profileData.phone}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                      {isEditing ? (
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={profileData.dateOfBirth}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(profileData.dateOfBirth).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2 text-purple-600" />
                    Academic Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
                      {isEditing ? (
                        <select
                          name="educationLevel"
                          value={profileData.educationLevel}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="High School">High School</option>
                          <option value="Diploma">Diploma</option>
                          <option value="Undergraduate">Undergraduate</option>
                          <option value="Postgraduate">Postgraduate</option>
                        </select>
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{profileData.educationLevel}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="institution"
                          value={profileData.institution}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{profileData.institution}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="course"
                          value={profileData.course}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{profileData.course}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">GPA / Percentage</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="gpa"
                          value={profileData.gpa}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{profileData.gpa}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      {isEditing ? (
                        <textarea
                          name="bio"
                          rows={4}
                          value={profileData.bio}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{profileData.bio}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Skills & Interests</label>
                      {isEditing ? (
                        <textarea
                          name="interests"
                          rows={3}
                          value={profileData.interests}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{profileData.interests}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-purple-600" />
                    Recent Achievements
                  </h3>
                  
                  <div className="space-y-4">
                    {achievements.map((achievement) => (
                      <div key={achievement.id} className="bg-white rounded-lg p-4 border border-purple-100">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900 text-sm">{achievement.title}</h4>
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 ml-2" />
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span className="text-green-600 font-medium">₹{achievement.amount}</span>
                          <span>{new Date(achievement.date).toLocaleDateString()}</span>
                        </div>
                        <div className="mt-2">
                          <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
                            {achievement.badge}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-purple-200">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Profile Completion</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">85% Complete</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;