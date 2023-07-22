const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

const UsersController = require('../controllers/usersController');
const usersController = new UsersController();

router.post('/signup', usersController.signupUser);
router.post('/login', usersController.doLogin);
router.delete('/logout', usersController.doLogout);
router.delete('/signout', authMiddleware, usersController.doSignout);
router.get('/findUser', authMiddleware, usersController.doFindLogin);

module.exports = router;
