import { Request, Response } from 'express';
import { createTResult } from '../core/DTO/TResult';
import { LoginDTO } from '../core/DTO/auth/auth.dto';
import { UserRegisterDTO } from '../core/DTO/users/user.dto';
import { userTransformer } from '../core/transformers/user.transformer';
import { comparePassword, generateJWT, hashPassword } from '../core/utils/security';
import { createUser, findUserbyUsername } from '../services/user.service';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as LoginDTO;

    const user = await findUserbyUsername(username);

    if (!user) {
      return res.status(404).json(createTResult(null, ['User not found']));
    }

    console.log(user);

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch)
      return res.status(400).json(createTResult(null, ['Invalid credentials']));

    const response = userTransformer(user);

    const token = await generateJWT(response);

    return res.status(200).json(createTResult<string>(token));
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const registerUser = req.body as UserRegisterDTO;

    const user = await findUserbyUsername(registerUser.username);

    if (user) 
      return res.status(400).json(createTResult(null, ['User already exists']));

    const hashedPassword = await hashPassword(registerUser.password);

    const newUser = await createUser({
      ...registerUser,
      password: hashedPassword,
    });

    res.status(201).json(createTResult<boolean>(!!newUser));
  } catch (error) {
    return res.status(500).json(error);
  }
};

