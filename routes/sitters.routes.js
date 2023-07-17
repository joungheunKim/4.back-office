const express = require('express');
const router = express.Router();

const SittersController = require('../controllers/sittersController')
const sittersController = new SittersController();

router.post('/signup/sitter', sittersController.signupSitter)

module.exports = router;