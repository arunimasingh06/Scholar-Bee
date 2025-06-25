const Course = require('../models/courseModel');
const Scholarship = require('../models/scholarshipModel');
const Application = require('../models/applicationModel');

// Get dynamic landing page data
exports.getLandingPage = async (req, res) => {
  try {
    // Get real statistics from database
    const totalScholarships = await Scholarship.countDocuments({ status: 'active' });
    const totalStudents = await Application.distinct('studentId').countDocuments();
    const totalFunding = await Scholarship.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({
      message: 'Welcome to ScholarBEE!',
      stats: {
        totalScholarships,
        totalStudents,
        totalFunding: totalFunding[0]?.total || 0
      },
      features: [
        'Find micro-scholarships',
        'Apply easily',
        'Track progress',
        'Sponsor directly to students'
      ]
    });
  } catch (error) {
    console.error('Error fetching landing page data:', error);
    res.status(500).json({ message: 'Error fetching landing page data' });
  }
};

// Get dynamic courses data
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ status: 'active' })
      .select('title level link description instructor duration category rating students price image tags scholarshipAvailable scholarshipAmount')
      .limit(20);

    res.json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Error fetching courses' });
  }
};

// Get dynamic about page data
exports.getAbout = async (req, res) => {
  try {
    // Get real statistics
    const totalStudents = await Application.distinct('studentId').countDocuments();
    const totalScholarships = await Scholarship.countDocuments();
    const totalFunding = await Scholarship.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({
      organization: 'ScholarBEE',
      mission: 'We connect underrepresented students with sponsors to fund education through micro-scholarships.',
      values: ['Transparency', 'Equity', 'Empowerment'],
      stats: {
        totalStudents,
        totalScholarships,
        totalFunding: totalFunding[0]?.total || 0
      }
    });
  } catch (error) {
    console.error('Error fetching about page data:', error);
    res.status(500).json({ message: 'Error fetching about page data' });
  }
};

// Get dynamic contact page data
exports.getContact = async (req, res) => {
  try {
    res.json({
      email: process.env.CONTACT_EMAIL || 'support@scholarbee.org',
      phone: process.env.CONTACT_PHONE || '+91 99999 88888',
      address: process.env.CONTACT_ADDRESS || '123, Knowledge Street, Delhi, India',
      socialMedia: {
        twitter: 'https://twitter.com/scholarbee',
        linkedin: 'https://linkedin.com/company/scholarbee',
        facebook: 'https://facebook.com/scholarbee'
      }
    });
  } catch (error) {
    console.error('Error fetching contact data:', error);
    res.status(500).json({ message: 'Error fetching contact data' });
  }
};
