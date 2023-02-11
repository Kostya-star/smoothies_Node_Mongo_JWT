const { Router } = require('express');
const authController = require('../controllers/authControllers')

const router = Router();

import {
  signup_get,
  signup_post,
  login_get,
  login_post,
} from '../controllers/authControllers';

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

module.exports = router;
