import express from 'express';
import { verify as verifyToken } from 'jsonwebtoken';
import { secretKey } from '../config/config';
import { UserResponseDTO } from '../DTO/users/user.dto';
import { createTResult } from '../DTO/TResult';

export default function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    let token = req.header('Authorization');

    if (!token) return res.status(401).json(
      createTResult(null,['No token provided'])
    );

    token = token.replace('Bearer ', '');

    const verify = verifyToken(token, secretKey) as UserResponseDTO;

    if (!verify) return res.status(401).json(
      createTResult(null,['Invalid token'])
    );

    next();
  } catch (error) {
    return res.status(401).json(
      createTResult(null,['Invalid token or token expired'])
    );
  }
}
