import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from './userModel';
import { config } from '../config/config';
import { User } from './userTypes';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  // Validation
  if (!name || !email || !password) {
    const error = createHttpError(400, 'All fields are required');
    return next(error);
  }

  // DB Call
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const error = createHttpError(
        400,
        'Email already exists with this email'
      );
      return next(error);
    }
  } catch (error) {
    return next(createHttpError(500, 'Error while getting user'));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let newUser: User;
  try {
    newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return next(createHttpError(500, 'Error while creating user.'));
  }

  try {
    // Token Generation JWT
    const token = jwt.sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: '7d',
    });

    // Response
    res.status(201).json({
      message: 'User Registered',
      name: newUser.name,
      accessToken: token,
    });
  } catch (error) {
    return next(createHttpError(500, 'Error while signin the jwt token.'));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    const error = createHttpError(400, 'All fields are required');
    return next(error);
  }

  // DB Call
  let user: User | null;
  try {
    user = await userModel.findOne({ email });
    if (!user) {
      const error = createHttpError(404, 'User not found.');
      return next(error);
    }
  } catch (error) {
    return next(createHttpError(500, 'Error while getting user'));
  }

  try {
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(createHttpError(400, 'Username or password incorrect.'));
    }

    // Token Generation JWT
    const token = jwt.sign({ sub: user._id }, config.jwtSecret as string, {
      expiresIn: '7d',
    });

    // Response
    res.status(200).json({
      message: 'User Logged In',
      name: user.name,
      accessToken: token,
    });
  } catch (error) {
    return next(createHttpError('Error while creating the jwt token.'));
  }
};

export { createUser, loginUser };
