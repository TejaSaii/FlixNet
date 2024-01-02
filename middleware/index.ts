import { NextFunction, Request, Response } from "express";
import { UserInterface } from "../interfaces"
import jwt from 'jsonwebtoken';
import userService from "../services/userService";
import dotenv from 'dotenv';


dotenv.config();
export const SECRET = process.env.SECRET as string;

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err: any, payload) => {
      if (err) {
        return res.sendStatus(403);
      }
      if (!payload || typeof payload == 'string') {
        return res.sendStatus(403);
      }
      //sending userId from headers to next request
      req.headers.userId = payload.id;
      next();
    });
  }
  else {
    res.sendStatus(401);
  }
}

export const getUserDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getUserByUserId(req.headers.userId as UserInterface["_id"]);
    if (user) {
      req.headers.email = user.email;
      if(!user.age) {
        res.status(403).json({message: 'User age not found'});
      }
      else req.headers.age = user.age.toString();
      next();
    }
    else res.status(403).json({message: 'User not logged in'});
  }
  catch (error) {
    res.status(403).json({ message: 'Unable to fetch user details'});
  }
};
