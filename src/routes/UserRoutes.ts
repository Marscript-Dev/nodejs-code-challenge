// Importar Express y otras dependencias
import express, { Request, Response } from 'express';
import prisma from '../../prisma/db';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'mi_secreto_jwt';

const authenticateToken = (req: Request, res: Response, next: () => void) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    //req.user = user;
    next();
  });
};

app.post('/register', async (req, res) => {
  const { username, lastname, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        user_name: username,
        user_lastname: lastname,
        user_email: email,
        user_password : password,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error al registrar el usuario' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { user_name : username },
  });
  if (!user || user.user_password !== password) {
    return res.status(400).json({ message: 'Credenciales inválidas' });
  }
  const accessToken = jwt.sign({ username }, JWT_SECRET);
  res.json({ accessToken });
});

app.get('/user', authenticateToken, async (req, res) => {
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
