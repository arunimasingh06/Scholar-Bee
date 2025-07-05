const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

// Public Info Pages
router.get('/', publicController.getLandingPage);
router.get('/courses', publicController.getCourses);
router.get('/about', publicController.getAbout);
router.get('/contact', publicController.getContact);

// Available scholarships for students
router.get('/scholarships', publicController.getAvailableScholarships);

module.exports = router;
