const Application = require('../models/Application');
const User = require('../models/User');

exports.getNGODashboard = async (req, res) => {
  try {
    const totalSponsors = await User.countDocuments({ role: 'sponsor' });
    const totalStudents = await User.countDocuments({ role: 'student' });

    res.json({ totalSponsors, totalStudents });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load NGO dashboard' });
  }
};

exports.getStudentProgress = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    const progress = await Application.find().populate('studentId');

    res.json({ students, applications: progress });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load student progress' });
  }
};
