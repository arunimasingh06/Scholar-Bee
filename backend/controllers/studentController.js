const Application = require('../models/Application');
const Scholarship = require('../models/Scholarship');

exports.getDashboard = async (req, res) => {
  try {
    const scholarships = await Scholarship.find({ status: 'open' });
    res.json(scholarships);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load dashboard' });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const apps = await Application.find({ studentId: req.user.id }).populate('scholarshipId');
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
};

exports.applyScholarship = async (req, res) => {
  const { scholarshipId } = req.params;
  const { essayText, documents } = req.body;
  try {
    const application = new Application({
      scholarshipId,
      studentId: req.user.id,
      essayText,
      documents
    });
    await application.save();
    res.status(201).json({ message: 'Application submitted' });
  } catch (err) {
    res.status(500).json({ message: 'Application failed' });
  }
};