const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// POST /contact -> Handle form submission
router.post('/', contactController.submitContactForm);

module.exports = router;
