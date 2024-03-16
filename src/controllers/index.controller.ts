import { Request, Response } from 'express';

export const helloWorld = async (req: Request, res: Response) => {
  res.send({
    message: 'Hello World',
  });
};
