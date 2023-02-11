import { User } from '../models/User';

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

export const signup_get = (req, res) => {
  res.render('signup');
};

export const login_get = (req, res) => {
  res.render('login');
};

export const signup_post = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
    // if(error.)
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
