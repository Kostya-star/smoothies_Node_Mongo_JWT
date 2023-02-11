export const signup_get = (req, res) => {
  res.render('signup')
}

export const login_get = (req, res) => {

  res.render('login')
}

export const signup_post = (req, res) => {
  console.log(req.body);
  res.send('new signup')
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