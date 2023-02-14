import jwt from 'jsonwebtoken'

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt

  if(token) {
    jwt.verify(token, 'smoothie app jwt secret', (err, decodedToken) => {
      if(err) {
        console.log(err.message);
        res.redirect('/login')
      } else {
        console.log(decodedToken);
        next()
      }
    })
  } else {
    res.redirect('/login')
  }
}