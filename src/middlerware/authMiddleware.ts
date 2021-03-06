import jwt from 'jsonwebtoken';
import express from 'express';

declare global {
  namespace Express {
    interface Request {
      admin: any;
    }
  }
}

// Authentication Middleware
const authMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const headerToken: string = req.headers.authorization?.split(' ')[1]!;
    const verifiedToken = await jwt.verify(headerToken, process.env.JWT_TOKEN!);
    req.admin = verifiedToken;
    next();
  } catch (err) {
    res.status(201).json({ error: true, data: { message: [`Restricted Route`] } });
  }
};

export default module.exports = authMiddleware;
