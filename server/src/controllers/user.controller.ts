import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { secret } from "../config";
import { UserDocumentInterface } from "../types/user/user.interface";
import UserModel from "../models/user.model";
import { Error } from "mongoose";
import { ExpressRequestInterface } from "../types/user/express-request.interface";

const normalizeUser = (user: UserDocumentInterface) => {
  const token = jwt.sign({ id: user.id, email: user.email }, secret);
  return {
    email: user.email,
    username: user.username,
    id: user.id,
    token,
  };
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = new UserModel({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    const savedUser = await newUser.save();
    res.send(normalizeUser(savedUser));
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      const messages = Object.values(err.errors).map((err) => err.message);
      res.status(422).json(messages);
      return;
    }
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email }).select(
      "+password"
    );
    const errorMessage = {
      invalidEmailOrPassword: "Invalid Email or Password",
    };
    if (!user) {
      res.status(422).json(errorMessage);
      return;
    }
    const validPassword = await user?.validatePassword(req.body.password);
    if (!validPassword) {
      res.status(422).json(errorMessage);
      return;
    }
    res.send(normalizeUser(user));
  } catch (err) {
    next(err);
  }
};

export const getUser = (
  req: ExpressRequestInterface,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }
  res.send(normalizeUser(req.user));
};
