import { User } from '../models/User';
import jwt from 'jsonwebtoken'

const handleErrors = (err) => {
  let errors = { email: '', password: '' };

  if(err.code === 11000) {
    errors.email = 'This email already exists'
    return errors
  }

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }: any) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const maxAge = 3 * 24 * 60 * 60

const onCreateToken = (id) => {
  return jwt.sign({ id }, 'smoothie app jwt secret', {
    expiresIn: maxAge
  })
}

export const signup_get = (req, res) => {
  res.render('signup');
};

export const login_get = (req, res) => {
  res.render('login');
};

export const signup_post = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = onCreateToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({errors});
  }
};

export const login_post = (req, res) => {
  res.send('new login');
};

// export {
//   signup_get,
//   login_get,
//   signup_post,
//   login_post
// }
