const Scholarship = require('../models/Scholarship');
const Application = require('../models/Application');
const mongoose = require('mongoose');
const User = require('../models/User');

// GET /sponsor/profile
exports.getProfile = async (req, res) => {
  try {
    const sponsor = await User.findById(req.user.id).select('-password');
    res.json(sponsor);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load sponsor profile' });
  }
};

// PUT /sponsor/profile
exports.updateProfile = async (req, res) => {
  const updates = req.body;
  try {
    const sponsor = await User.findById(req.user.id);

    // Prevent students from updating sponsor-only fields
    if (sponsor.role !== 'sponsor') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const allowedFields = ['fullname', 'phone', 'profilePic', 'organizationName', 'organizationType', 'missionStatement', 'logoUrl'];
    allowedFields.forEach(field => {
      if (updates[field] !== undefined) {
        sponsor[field] = updates[field];
      }
    });

    await sponsor.save();
    res.json({ message: 'Profile updated successfully', sponsor });
  } catch (err) {
    res.status(500).json({ message: 'Error updating sponsor profile' });
  }
};


exports.getDashboard = async (req, res) => {
  try {
    const scholarships = await Scholarship.find({ sponsorId: req.user.id });
    const totalAmount = scholarships.reduce((acc, s) => acc + (s.amountPerStudent * s.numberOfAwards), 0);
    const applications = await Application.find({ scholarshipId: { $in: scholarships.map(s => s._id) } });
    res.json({
      scholarshipsCount: scholarships.length,
      totalAmount,
      applicants: applications.length
    });
  } catch (err) {
    res.status(500).json({ message: 'Dashboard failed' });
  }
};

exports.createScholarship = async (req, res) => {
  try {
    const scholarship = new Scholarship({
      ...req.body,
      sponsorId: req.user.id
    });
    await scholarship.save();
    res.status(201).json({ message: 'Scholarship created', scholarship });
  } catch (err) {
    res.status(500).json({ message: 'Creation failed' });
  }
};

exports.listScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find({ sponsorId: req.user.id });
    res.json(scholarships);
  } catch (err) {
    res.status(500).json({ message: 'Failed to list scholarships' });
  }
};

exports.updateScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.findOneAndUpdate(
      { _id: req.params.id, sponsorId: req.user.id },
      req.body,
      { new: true }
    );
    if (!scholarship) return res.status(404).json({ message: 'Scholarship not found or not owned by you' });
    res.json({ message: 'Scholarship updated', scholarship });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
};

exports.closeScholarship = async (req, res) => {
  try {
    const updated = await Scholarship.findOneAndUpdate(
      { _id: req.params.id, sponsorId: req.user.id },
      { status: 'closed' },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Scholarship not found or not yours' });
    res.json({ message: 'Scholarship closed', updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to close scholarship' });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const apps = await Application.find({ scholarshipId: req.params.id }).populate('studentId');
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
};

exports.decideApplication = async (req, res) => {
  const { status } = req.body; // "approved" or "rejected"
  try {
    const validStatuses = ['approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid decision status' });
    }

    const app = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('studentId');

    if (!app) return res.status(404).json({ message: 'Application not found' });

    res.json({ message: `Application ${status}`, application: app });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update application status' });
  }
};
