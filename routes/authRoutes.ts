const { Router } = require('express');

const router = Router();

import {
  signup_get,
  signup_post,
  login_get,
  login_post,
} from '../controllers/authControllers';

router.get('/signup', signup_get)
router.post('/signup', signup_post)
router.get('/login', login_get)
router.post('/login', login_post)

export default router;
