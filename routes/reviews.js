const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const { Reviews } = require('../models');
const authMiddleware = require('../middlewares/auth');

const ReviewsController = require('../controllers/reviewsController');
const reviewsController = new ReviewsController();

router.get('/reviews/:sitter_id', reviewsController.get);
router.post('/reviews/:sitter_id', authMiddleware, reviewsController.post);
router.put(
  '/reviews/:sitter_id/:review_id',
  authMiddleware,
  reviewsController.put
);
router.delete(
  '/reviews/:sitter_id/:review_id',
  authMiddleware,
  reviewsController.delete
);

module.exports = router;
