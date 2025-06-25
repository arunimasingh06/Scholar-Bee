import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { publicAPI } from '../services/api';
import { 
  Users, 
  Award, 
  TrendingUp, 
  Heart,
  Loader,
  AlertCircle
} from 'lucide-react';

const About = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aboutData, setAboutData] = useState({
    organization: 'ScholarBEE',
    mission: '',
    values: [],
    stats: {
      totalStudents: 0,
      totalScholarships: 0,
      totalFunding: 0
    }
  });

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const data = await publicAPI.getAboutData();
      setAboutData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching about data:', err);
      setError('Failed to load about page data');
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      icon: Users,
      value: aboutData.stats.totalStudents.toLocaleString(),
      label: 'Students Helped',
      color: 'text-blue-600'
    },
    {
      icon: Award,
      value: aboutData.stats.totalScholarships.toLocaleString(),
      label: 'Scholarships Awarded',
      color: 'text-green-600'
    },
    {
      icon: TrendingUp,
      value: `₹${(aboutData.stats.totalFunding / 100000).toFixed(1)}L`,
      label: 'Total Funding',
      color: 'text-purple-600'
    }
  ];

  const values = [
    {
      title: 'Transparency',
      description: 'We believe in complete transparency in our scholarship process, ensuring every student and sponsor knows exactly how funds are allocated and used.',
      icon: '🔍'
    },
    {
      title: 'Equity',
      description: 'We strive to provide equal opportunities for all students, regardless of their background, ensuring merit-based selection processes.',
      icon: '⚖️'
    },
    {
      title: 'Empowerment',
      description: 'Our mission is to empower students through education, giving them the tools and resources they need to achieve their dreams.',
      icon: '🚀'
    }
  ];

  const team = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      bio: 'Former IIT professor with 15+ years in EdTech. Passionate about democratizing education through technology.'
    },
    {
      name: 'Priya Sharma',
      role: 'Chief Technology Officer',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      bio: 'Ex-Google engineer specializing in AI/ML. Leading our technology innovation and platform development.'
    },
    {
      name: 'Amit Patel',
      role: 'Head of Partnerships',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      bio: 'Former McKinsey consultant with expertise in building strategic partnerships with corporates and NGOs.'
    },
    {
      name: 'Sneha Gupta',
      role: 'Head of Student Success',
      image: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
      bio: 'Education specialist focused on student engagement and success. Former program director at Teach for India.'
    }
  ];

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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600">{error}</p>
            <button 
              onClick={fetchAboutData}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About {aboutData.organization}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            {aboutData.mission}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {aboutData.mission}
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Join Us in Making a Difference</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Whether you're a student looking for opportunities or a sponsor wanting to make an impact, 
            we're here to help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Become a Student
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
              Become a Sponsor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;