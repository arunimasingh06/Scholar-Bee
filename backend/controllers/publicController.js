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

// Get available scholarships for students
exports.getAvailableScholarships = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const skip = (page - 1) * limit;

    // Build filter query - show active scholarships (same as student dashboard)
    const andConditions = [
      { status: 'active' }
    ];

    if (category && category !== 'all') {
      andConditions.push({ category });
    }
    if (search) {
      andConditions.push({
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search, 'i')] } }
        ]
      });
    }

    const filter = { $and: andConditions };

    // Get scholarships with pagination
    const scholarships = await Scholarship.find(filter)
      .select('title description amount category difficulty deadline tags numberOfAwards totalBudget status paymentStatus')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Scholarship.countDocuments(filter);

    // Get applicant count for each scholarship
    const scholarshipsWithApplicants = await Promise.all(
      scholarships.map(async (scholarship) => {
        const applicantCount = await Application.countDocuments({ 
          scholarshipId: scholarship._id 
        });
        return {
          id: scholarship._id,
          title: scholarship.title,
          description: scholarship.description,
          amount: scholarship.amount,
          category: scholarship.category,
          difficulty: scholarship.difficulty,
          deadline: scholarship.deadline,
          tags: scholarship.tags,
          numberOfAwards: scholarship.numberOfAwards,
          totalBudget: scholarship.totalBudget,
          status: scholarship.status,
          paymentStatus: scholarship.paymentStatus,
          applicants: applicantCount
        };
      })
    );

    res.json({
      success: true,
      scholarships: scholarshipsWithApplicants,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching available scholarships:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching available scholarships' 
    });
  }
};
