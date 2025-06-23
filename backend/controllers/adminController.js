const User = require('../models/User');
const Scholarship = require('../models/Scholarship');
const Application = require('../models/Application');

exports.getAdminDashboard = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const scholarships = await Scholarship.countDocuments();
    const applications = await Application.countDocuments();

    res.json({
      totalUsers: users,
      totalScholarships: scholarships,
      totalApplications: applications
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load admin dashboard' });
  }
};
