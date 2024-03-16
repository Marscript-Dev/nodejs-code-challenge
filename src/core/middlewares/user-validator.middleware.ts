import express from 'express';
import { findUserByUUID } from '../../services/user.service';
import { createTResult } from '../DTO/TResult';

export default async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    let userId: string;

    if (req.params.userId) {
      userId = req.params.userId;
    } else {
      userId = req.body.userId;
    }

    const user = await findUserByUUID(userId);
    if (!user)
      return res.status(404).json(createTResult(null, ['User not found']));

    req.params.userId = user.id.toString();

    next();
  } catch (error) {
    return res
      .status(401)
      .json(createTResult(null, ['Invalid User or User not found']));
  }
}
