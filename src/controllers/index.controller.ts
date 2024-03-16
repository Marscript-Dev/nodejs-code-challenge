import { Request, Response } from 'express';
import { createTResult } from '../core/DTO/TResult';

export const helloWorld = async (req: Request, res: Response) => {
  res.send(createTResult<string>('Hello World!'));
};
