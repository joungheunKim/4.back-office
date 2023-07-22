const express = require('express');
const router = express.Router();
const { Reviews } = require('../models');

const ReviewsController = require('../controllers/reviewsController');
const reviewsController = new ReviewsController();

router.get('/reviews/:sitter_id', reviewsController.get);
router.post('/reviews/:sitter_id', reviewsController.post);
router.put('/reviews/:sitter_id/:review_id', reviewsController.put);
router.delete('/reviews/:sitter_id/:review_id', reviewsController.delete);

module.exports = router;
