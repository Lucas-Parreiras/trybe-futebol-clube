import { NextFunction, Request, Response } from 'express';

class Validations {
  static validateLoginFields(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    return next();
  }

  static validateLoginInfo(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    const emailRegex = /.+@.+\.com/;
    const isEmailValid = emailRegex.test(email);

    if (!isEmailValid || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return next();
  }
}

export default Validations;
