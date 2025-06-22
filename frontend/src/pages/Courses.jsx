import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Award, 
  Play,
  Filter,
  Search,
  TrendingUp,
  Code,
  Database,
  Palette,
  BarChart3,
  Smartphone,
  Globe
} from 'lucide-react';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const categories = [
    { id: 'programming', name: 'Programming', icon: Code, color: 'text-blue-600' },
    { id: 'data-science', name: 'Data Science', icon: Database, color: 'text-green-600' },
    { id: 'design', name: 'Design', icon: Palette, color: 'text-pink-600' },
    { id: 'business', name: 'Business', icon: BarChart3, color: 'text-purple-600' },
    { id: 'mobile', name: 'Mobile Dev', icon: Smartphone, color: 'text-orange-600' },
    { id: 'web', name: 'Web Dev', icon: Globe, color: 'text-indigo-600' }
  ];

  const courses = [
    {
      id: 1,
      title: 'Complete Python Programming Bootcamp',
      description: 'Master Python from basics to advanced concepts including web development, data science, and automation.',
      instructor: 'Dr. Rajesh Kumar',
      duration: '12 weeks',
      level: 'Beginner',
      category: 'programming',
      rating: 4.8,
      students: 15420,
      price: 'Free',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      tags: ['Python', 'Programming', 'Web Development'],
      scholarshipAvailable: true,
      scholarshipAmount: 1000
    },
    {
      id: 2,
      title: 'Data Science with Machine Learning',
      description: 'Learn data analysis, visualization, and machine learning using Python and popular libraries.',
      instructor: 'Prof. Priya Sharma',
      duration: '16 weeks',
      level: 'Intermediate',
      category: 'data-science',
      rating: 4.9,
      students: 8750,
      price: 'Free',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      tags: ['Data Science', 'Machine Learning', 'Python'],
      scholarshipAvailable: true,
      scholarshipAmount: 1500
    },
    {
      id: 3,
      title: 'Full Stack Web Development',
      description: 'Build modern web applications using React, Node.js, and MongoDB from scratch.',
      instructor: 'Amit Patel',
      duration: '20 weeks',
      level: 'Intermediate',
      category: 'web',
      rating: 4.7,
      students: 12300,
      price: 'Free',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      tags: ['React', 'Node.js', 'MongoDB'],
      scholarshipAvailable: true,
      scholarshipAmount: 1200
    },
    {
      id: 4,
      title: 'UI/UX Design Fundamentals',
      description: 'Learn design principles, user research, prototyping, and create stunning user interfaces.',
      instructor: 'Sneha Gupta',
      duration: '10 weeks',
      level: 'Beginner',
      category: 'design',
      rating: 4.6,
      students: 9800,
      price: 'Free',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      tags: ['UI Design', 'UX Research', 'Figma'],
      scholarshipAvailable: true,
      scholarshipAmount: 800
    },
    {
      id: 5,
      title: 'Digital Marketing Mastery',
      description: 'Master SEO, social media marketing, content strategy, and analytics for business growth.',
      instructor: 'Vikram Singh',
      duration: '8 weeks',
      level: 'Beginner',
      category: 'business',
      rating: 4.5,
      students: 11200,
      price: 'Free',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      tags: ['SEO', 'Social Media', 'Analytics'],
      scholarshipAvailable: true,
      scholarshipAmount: 750
    },
    {
      id: 6,
      title: 'Mobile App Development with React Native',
      description: 'Build cross-platform mobile apps for iOS and Android using React Native framework.',
      instructor: 'Arjun Mehta',
      duration: '14 weeks',
      level: 'Advanced',
      category: 'mobile',
      rating: 4.8,
      students: 6500,
      price: 'Free',
      image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      tags: ['React Native', 'Mobile Development', 'JavaScript'],
      scholarshipAvailable: true,
      scholarshipAmount: 1300
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level.toLowerCase() === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Learn Skills, Earn Rewards
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Access high-quality courses and get rewarded for completing milestones. 
              Build your future with hands-on learning and financial support.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-blue-100">Expert Courses</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">₹10L+</div>
                <div className="text-sm text-blue-100">Rewards Distributed</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">25K+</div>
                <div className="text-sm text-blue-100">Students Enrolled</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                  selectedCategory === category.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <category.icon className={`w-8 h-8 mx-auto mb-2 ${category.color}`} />
                <div className="text-sm font-medium text-gray-900">{category.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 hover:border-blue-300">
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                {course.scholarshipAvailable && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                    <Award className="w-3 h-3 mr-1" />
                    ₹{course.scholarshipAmount} Scholarship
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                  {course.price}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium text-gray-700 ml-1">{course.rating}</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {course.description}
                </p>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="mr-4">{course.duration}</span>
                  <Users className="w-4 h-4 mr-1" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {course.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    by {course.instructor}
                  </div>
                  <Link
                    to="/student/signup"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center space-x-1"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start Learning</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria to find the perfect course for you.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedLevel('all');
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 mt-16 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Join thousands of students who are already earning rewards for their learning achievements. 
            Sign up today and get access to all courses with scholarship opportunities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/student/signup"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Join as Student
            </Link>
            <Link
              to="/sponsor/signup"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Become a Sponsor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;