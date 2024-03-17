import express, { Request, Response } from 'express';
import * as auth from '../middleware/Auth';
import * as User from '../services/UserService';
import bcrypjs from 'bcryptjs';

const app = express();
app.use(express.json());


app.post('/login', async (req, res) => {
    const { username } = req.body;

    const user = await User.findUserByUsername(username);

    if (!user) {
      return res.status(400).json({ message: 'El usuario no existe' });
    }    

    const accessToken = auth.getToken(user);    

    res.json({ accessToken });
  });

  