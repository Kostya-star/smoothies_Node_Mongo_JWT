import { User } from "../models/User"

export const signup_get = (req, res) => {
  res.render('signup')
}

export const login_get = (req, res) => {

  res.render('login')
}

export const signup_post = async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(400).send('Error, user not created')
  }
}

export const login_post = (req, res) => {
  
  res.send('new login')
}

// export {
//   signup_get, 
//   login_get,
//   signup_post,
//   login_post
// }