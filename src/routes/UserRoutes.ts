import express, { Request, Response } from 'express';
import prisma from '../../prisma/db';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as UserService from '../services/UserService';
import * as AuthService from '../services/AuthService';
import * as Auth from '../middleware/Auth';

//Models
import {IUser}  from '../models/User';

dotenv.config();

const app = express.Router();

app.post('/register', async (req, res) => {
  const { username, lastname, email, password } = req.body;

  if(username === undefined || lastname === undefined || email === undefined || password === undefined)
  {
    return res.status(400).json({ message:"Parámetros faltantes"});
  }

  try {
    const user : IUser =  {
        user_id:        1,
        user_name:      username,
        user_lastname:  lastname,
        user_email:     email,
        user_password:  password,
      };

    const userAdded = await UserService.registerUser(user);

    res.json(userAdded);
  } catch (error) {
    res.status(400).json({ message: 'Error al registrar el usuario' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if(username === undefined || password === undefined) {
    return res.status(400).json({ message:"Parámetros faltantes"});
  }

  const user = await UserService.findUserByUsername(username);

  const hashedPassword = await AuthService.hashPassword(password);
  const isMatch = await AuthService.comparePasswords(password, hashedPassword);

  if (!user || !isMatch) {
    return res.status(400).json({ message: 'Credenciales inválidas' });
  }
  const accessToken = Auth.getToken(user);
  res.json({ accessToken });
});

app.get('/user', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { user_name: req.body.username },
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener información del usuario' });
  }
});

export default app;
