const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

// Public Info Pages
router.get('/', publicController.getLandingPage);
router.get('/courses', publicController.getCourses);
router.get('/about', publicController.getAbout);
router.get('/contact', publicController.getContact);

module.exports = router;
