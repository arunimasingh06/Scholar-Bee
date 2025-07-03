const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const updates = req.body;

    // Validate sponsor-only fields
    if (user.role !== 'sponsor') {
      delete updates.organizationName;
      delete updates.organizationType;
      delete updates.missionStatement;
      delete updates.logoUrl;
    }

    // Validate student-only fields
    if (user.role !== 'student') {
      delete updates.educationLevel;
      delete updates.institution;
      delete updates.gpa;
      delete updates.familyIncome;
      delete updates.resumeUrl;
      delete updates.skills;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile' });
  }
};

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect current password' });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating password' });
  }
};


// Role-based validation is now added in the updateProfile controller:

//  If the user is not a student, all student-specific fields (e.g., institution, gpa) are ignored.

//  If the user is not a sponsor, sponsor fields (e.g., organizationName, missionStatement) are also stripped before update.
