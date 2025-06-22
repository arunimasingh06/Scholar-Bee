import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { 
  Building, 
  Mail, 
  Phone, 
  Globe, 
  Edit3, 
  Save, 
  Upload,
  Award,
  Users,
  TrendingUp,
  Heart
} from 'lucide-react';

const SponsorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    organizationName: 'Tech Foundation',
    organizationType: 'Foundation',
    contactPersonName: 'Dr. Sarah Johnson',
    email: 'contact@techfoundation.org',
    phone: '+91 9876543210',
    website: 'https://techfoundation.org',
    address: '123 Innovation Hub, Bangalore, Karnataka 560001',
    mission: 'Empowering the next generation of technologists through education and skill development. We believe in creating opportunities for underprivileged students to access quality education and build successful careers in technology.',
    foundedYear: '2018',
    employeeCount: '50-100',
    focusAreas: 'Technology Education, Skill Development, Career Guidance'
  });

  const achievements = [
    {
      id: 1,
      title: 'Students Sponsored',
      value: 150,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 2,
      title: 'Total Donated',
      value: '₹2.5L',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 3,
      title: 'Scholarships Created',
      value: 45,
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      id: 4,
      title: 'Success Stories',
      value: 89,
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100'
    }
  ];

  const recentImpact = [
    {
      id: 1,
      studentName: 'Priya Sharma',
      achievement: 'Completed Full Stack Development',
      amount: 1500,
      date: '2025-01-20',
      outcome: 'Secured internship at tech startup'
    },
    {
      id: 2,
      studentName: 'Rahul Kumar',
      achievement: 'Data Science Certification',
      amount: 1200,
      date: '2025-01-18',
      outcome: 'Started freelancing projects'
    },
    {
      id: 3,
      studentName: 'Anita Patel',
      achievement: 'Community Leadership Project',
      amount: 800,
      date: '2025-01-15',
      outcome: 'Launched local NGO initiative'
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
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-8">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <Building className="w-12 h-12 text-gray-400" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white hover:bg-purple-600 transition-colors">
                  <Upload className="w-4 h-4" />
                </button>
              </div>
              
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl font-bold text-white">{profileData.organizationName}</h1>
                <p className="text-purple-100">{profileData.organizationType} • Since {profileData.foundedYear}</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                  <div className="bg-white/20 text-white px-3 py-1 rounded-full text-sm flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    Verified Sponsor
                  </div>
                  <div className="bg-white/20 text-white px-3 py-1 rounded-full text-sm flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    Impact Partner
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Organization Information */}
              <div className="lg:col-span-2 space-y-8">
                {/* Basic Information */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Building className="w-5 h-5 mr-2 text-purple-600" />
                    Organization Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="organizationName"
                          value={profileData.organizationName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{profileData.organizationName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Organization Type</label>
                      {isEditing ? (
                        <select
                          name="organizationType"
                          value={profileData.organizationType}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="Individual">Individual Donor</option>
                          <option value="NGO">NGO</option>
                          <option value="Corporate">Corporate</option>
                          <option value="Foundation">Foundation</option>
                          <option value="Educational">Educational Institution</option>
                        </select>
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{profileData.organizationType}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="contactPersonName"
                          value={profileData.contactPersonName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{profileData.contactPersonName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Founded Year</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="foundedYear"
                          value={profileData.foundedYear}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{profileData.foundedYear}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          {profileData.phone}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                      {isEditing ? (
                        <input
                          type="url"
                          name="website"
                          value={profileData.website}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg flex items-center">
                          <Globe className="w-4 h-4 mr-2" />
                          <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800">
                            {profileData.website}
                          </a>
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Employee Count</label>
                      {isEditing ? (
                        <select
                          name="employeeCount"
                          value={profileData.employeeCount}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="1-10">1-10</option>
                          <option value="11-50">11-50</option>
                          <option value="50-100">50-100</option>
                          <option value="100-500">100-500</option>
                          <option value="500+">500+</option>
                        </select>
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{profileData.employeeCount}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    {isEditing ? (
                      <textarea
                        name="address"
                        rows={2}
                        value={profileData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{profileData.address}</p>
                    )}
                  </div>
                </div>

                {/* Mission & Focus */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Mission & Focus Areas</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mission Statement</label>
                      {isEditing ? (
                        <textarea
                          name="mission"
                          rows={4}
                          value={profileData.mission}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{profileData.mission}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Focus Areas</label>
                      {isEditing ? (
                        <textarea
                          name="focusAreas"
                          rows={2}
                          value={profileData.focusAreas}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{profileData.focusAreas}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Impact & Achievements Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Achievement Stats */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-purple-600" />
                    Impact Overview
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <div key={achievement.id} className="bg-white rounded-lg p-4 text-center">
                        <div className={`w-10 h-10 ${achievement.bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}>
                          <achievement.icon className={`w-5 h-5 ${achievement.color}`} />
                        </div>
                        <div className="text-lg font-bold text-gray-900">{achievement.value}</div>
                        <div className="text-xs text-gray-600">{achievement.title}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Impact Stories */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-pink-600" />
                    Recent Impact
                  </h3>
                  
                  <div className="space-y-4">
                    {recentImpact.map((impact) => (
                      <div key={impact.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900 text-sm">{impact.studentName}</h4>
                          <span className="text-green-600 font-medium text-sm">₹{impact.amount}</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{impact.achievement}</p>
                        <p className="text-xs text-blue-600 font-medium">{impact.outcome}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(impact.date).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verification Status */}
                <div className="bg-green-50 rounded-xl border border-green-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Verification Status</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-gray-700">Organization Verified</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-gray-700">Tax ID Confirmed</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-gray-700">Payment Methods Active</span>
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

export default SponsorProfile;