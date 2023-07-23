const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const PostsController = require('../controllers/postsController');

const postsController = new PostsController();

router.post('/post', authMiddleware, postsController.createPost);
router.get('/post', postsController.getPosts);
router.get('/post/:post_id', postsController.getPostById);
router.put('/post/:post_id', authMiddleware, postsController.updatePost);
router.delete('/post/:post_id', authMiddleware, postsController.deletePost);

module.exports = router;
