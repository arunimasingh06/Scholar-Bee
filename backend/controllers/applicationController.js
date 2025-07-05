const Application = require('../models/applicationModel');
const Scholarship = require('../models/scholarshipModel');

//  Submit new application
exports.submitApplication = async (req, res) => {
  const { scholarshipId } = req.params;
  const { essay, motivation, projectPlan, timeline, documents, amount } = req.body;

  try {
    const scholarship = await Scholarship.findById(scholarshipId);
    console.log('Scholarship found:', scholarship);
    console.log('Application submission payload:', {
      scholarshipId,
      studentId: req.user.id,
      essay, motivation, projectPlan, timeline, documents, amount
    });
    if (!scholarship || scholarship.status !== 'active') {
      return res.status(400).json({ message: 'Invalid or inactive scholarship' });
    }

    const existing = await Application.findOne({
      scholarshipId,
      studentId: req.user.id
    });

    if (existing) {
      return res.status(409).json({ message: 'You already applied for this scholarship' });
    }

    const newApp = new Application({
      scholarshipId,
      studentId: req.user.id,
      essay,
      motivation,
      projectPlan,
      timeline,
      documents: documents || [],
      amount: amount || scholarship.amount
    });

    await newApp.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (err) {
    console.error('Application submission error:', err);
    res.status(500).json({ message: 'Submission failed', error: err.message });
  }
};

//  Get all applications for a scholarship (sponsor view)
exports.getScholarshipApplications = async (req, res) => {
  try {
    const apps = await Application.find({ scholarshipId: req.params.id })
      .populate('studentId', '-password')
      .sort({ submittedAt: -1 });

    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
};

//  Approve/Reject application
exports.decideApplication = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const app = await Application.findById(id);
    if (!app) return res.status(404).json({ message: 'Application not found' });

    app.status = status;
    await app.save();
    res.json({ message: `Application ${status}` });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status' });
  }
};

//  Upload receipt (student after award)
exports.uploadReceipt = async (req, res) => {
  const { id } = req.params;
  const { receiptUrl } = req.body;

  try {
    const app = await Application.findById(id);
    if (!app || app.studentId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    app.receiptUrl = receiptUrl;
    app.verified = false;
    await app.save();

    res.json({ message: 'Receipt uploaded. Awaiting verification.' });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed' });
  }
};

//  Verify receipt (admin/sponsor)
exports.verifyReceipt = async (req, res) => {
  const { id } = req.params;

  try {
    const app = await Application.findById(id);
    if (!app) return res.status(404).json({ message: 'Application not found' });

    app.verified = true;
    await app.save();
    res.json({ message: 'Receipt verified' });
  } catch (err) {
    res.status(500).json({ message: 'Verification failed' });
  }
};
