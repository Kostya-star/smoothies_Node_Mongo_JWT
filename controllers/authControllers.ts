import { User } from '../models/User';
import jwt from 'jsonwebtoken'

//handle erros
const handleErrors = (err) => {
  let errors = { email: '', password: '' };
  //login_post erros
  if(err.message === 'Incorrect email') {
    errors.email = 'This email is not registered'
  }

  if(err.message === 'Incorrect password') {
    errors.password = 'The password is not correct'
  }

  // signup_post errors
  //duplicate error code
  if(err.code === 11000) {
    errors.email = 'This email already exists'
    return errors
  }

  //validation errors
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

export const login_post = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.login(email, password)
    const token = onCreateToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(200).json({ user: user._id })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors });
  }
};