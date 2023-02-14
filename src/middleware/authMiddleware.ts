import jwt from 'jsonwebtoken';
import { User } from './../models/User';
import {Request, Response, NextFunction} from 'express'


export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const token: string | undefined = req.cookies.jwt;

  if (token) {
    jwt.verify(token, 'smoothie app jwt secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        // do not persist cache of the protected pages
        res.set({
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
          });
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

export const checkUser = (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'smoothie app jwt secret', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        // @ts-expect-error
        const user = await User.findById(decodedToken?.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
