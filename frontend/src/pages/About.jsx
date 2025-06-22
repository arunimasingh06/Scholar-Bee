import React from 'react';
import Navbar from '../components/Navbar';
import { 
  Award, 
  Users, 
  TrendingUp, 
  Heart, 
  Target, 
  Lightbulb,
  Shield,
  Globe,
  CheckCircle,
  Star,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { icon: Users, label: 'Students Empowered', value: '25,000+', color: 'text-blue-600' },
    { icon: Award, label: 'Scholarships Awarded', value: '15,000+', color: 'text-green-600' },
    { icon: TrendingUp, label: 'Funds Distributed', value: '₹2.5 Crores', color: 'text-purple-600' },
    { icon: Heart, label: 'Partner Organizations', value: '500+', color: 'text-pink-600' }
  ];

  const values = [
    {
      icon: Target,
      title: 'Accessibility',
      description: 'Making quality education and financial support accessible to every student, regardless of their background.'
    },
    {
      icon: Shield,
      title: 'Transparency',
      description: 'Complete transparency in fund allocation and student progress tracking for all stakeholders.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Leveraging cutting-edge technology to create new pathways for educational funding and support.'
    },
    {
      icon: Globe,
      title: 'Impact',
      description: 'Creating measurable social impact by connecting learning achievements with financial rewards.'
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

  const milestones = [
    {
      year: '2022',
      title: 'Foundation',
      description: 'LearnReward was founded with a vision to revolutionize educational funding in India.'
    },
    {
      year: '2023',
      title: 'First 1000 Students',
      description: 'Reached our first milestone of 1000 students and distributed ₹10 lakhs in scholarships.'
    },
    {
      year: '2024',
      title: 'AI Integration',
      description: 'Launched AI-powered matching system and fraud detection to enhance platform security.'
    },
    {
      year: '2025',
      title: 'Scale & Impact',
      description: 'Expanded to 25,000+ students with 500+ partner organizations across India.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Empowering India's
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Future Leaders
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto">
              We're on a mission to democratize education by rewarding learning achievements 
              and connecting students with opportunities that transform their lives.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${stat.color.replace('text-', 'bg-').replace('-600', '-100')} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                LearnReward exists to bridge the gap between talent and opportunity in India's education landscape. 
                We believe that every student deserves access to quality education and financial support, 
                regardless of their economic background.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Through our innovative platform, we're creating a new paradigm where learning achievements 
                are directly rewarded, motivation is sustained, and educational dreams become reality.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Instant UPI-based reward system</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">AI-powered fraud detection and verification</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Milestone-based learning approach</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Transparent impact tracking for sponsors</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2"
                alt="Students learning"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">95%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape our commitment to transforming education in India.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-200">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600">Key milestones in our mission to transform education</p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-white border-4 border-blue-600 rounded-full"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              Passionate individuals working together to make education accessible for everyone
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join Our Mission to Transform Education
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Whether you're a student looking to learn and earn, or an organization wanting to make an impact, 
            there's a place for you in our community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/student/signup"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/sponsor/signup"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;