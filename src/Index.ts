import express, { Request, Response } from 'express';
import prisma from './prisma/client';
import axios from 'axios";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

const authentication = (req: Request, res: Response, next: ()=> void) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try{
        const user = await prisma.user.create({ 
            data:{
                username,
                password
            }
        });
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: `Error al registrar usuario: ${err.message}`});
    }
});

app.post('/login', async (req, res) => {

    const { username, password } = req.body;

    const user = await prisma.user.findUnique({ 
        where: {username},
    });

    if (!user || !user.password !== password) {
        return res.status(400).json({ message: 'Usuario o contraseña inválido.' });
    }

    const accessToken = jwt.sign({ username}, JWT_SECRET);
    res.json({ accessToken });

});

app.post('/apiPokemon', authenticateToken, async (req, res) => {
    const { pokemonName } = req.body;
    try{
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        const pokemon = await prisma.pokemon.create({
            data:{
                name: response.data.name,
                type: response.data.type[0].type_name,
                userId: req.user.id,
            }
        });

        res.json(pokemon);
    } catch (err) {
        res.status(400).json({message: `Error al guardar pokemon ${err.message}`});
    }
});

app.listen(PORT, () => {
    console.log(`Corriendo en el puerto ${PORT}`);
});