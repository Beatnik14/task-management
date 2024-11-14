import { Response, NextFunction } from "express";
import { ExpressRequestInterface } from "../types/user/express-request.interface";
import UserModel from "../models/user.model";
import jwt from "jsonwebtoken";
import { secret } from "../config";
export default async (
  req: ExpressRequestInterface,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token) {
      res.sendStatus(401);
      return;
    }
    const userData = jwt.verify(token, secret) as { id: string; email: string };
    const user = await UserModel.findById(userData.id);
    if(!user) {
        res.sendStatus(401)
        return;
    }
    req.user = user;
    next()
  } catch (err) {
    res.sendStatus(401);
  }
};
