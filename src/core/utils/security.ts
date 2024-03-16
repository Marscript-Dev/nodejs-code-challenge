import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { secretKey } from '../config/config';
import { UserResponseDTO } from '../DTO/users/user.dto';

export const hashPassword = async (password: string) =>
  await bcrypt.hash(password, 10);

export const comparePassword = async (password: string, hash: string) =>
  await bcrypt.compare(password, hash);

export const generateJWT = async (payload: UserResponseDTO | {}) =>
  jwt.sign(payload, secretKey, {
    expiresIn: '1d',
  });
