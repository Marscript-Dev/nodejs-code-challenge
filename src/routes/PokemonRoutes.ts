// Importar Express y otras dependencias
import express, { Request, Response } from 'express';
import prisma from '../../prisma/db';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as Pokemon from '../services/Pokemon';
import { IPokemon } from '../models/Pokemon';

dotenv.config();

const app = express();
app.use(express.json());

const authenticateToken = (req: Request, res: Response, next: () => void) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    //req.body.user = user;
    next();
  });
};

//Agregar pokemon
app.post('/pokemon', authenticateToken, async (req, res) => {
  const { pokemonName } = req.body;
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemon = await prisma.pokemon.create({
      data: {
        pokemon_name: response.data.name,
        type_id: response.data.type_id,
        user_id: req.body.user_id,
      },
    });
    res.json(pokemon);
  } catch (error) {
    res.status(400).json({ message: 'Error al agregar el Pokémon' });
  }
});

//Pokemons por usuario
app.get('/pokemon', authenticateToken, async (req, res) => {
  try {
    const pokemons = await prisma.pokemon.findMany({
      where: { user_id: req.body.user_id },
    });
    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los Pokémon' });
  }
});

//Obtener pokemons por id
app.get('/pokemon/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const pokemon = await prisma.pokemon.findUnique({
      where: { pokemon_id: parseInt(id, 10) },
    });
    if (!pokemon) {
      return res.status(404).json({ message: 'Pokémon no encontrado' });
    }
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener información del Pokémon' });
  }
});

// Ruta protegida para marcar un Pokémon como favorito
app.post('/favorite/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = 100;
  try {
    // Verificar si el Pokémon existe y pertenece al usuario
    const pokemon = await Pokemon.getPokemonById(parseInt(id, 10));
    if (!pokemon || pokemon.user_id !== userId) {
      return res.status(404).json({ message: 'Pokémon no encontrado' });
    }

    const pokemonInsert : IPokemon ={
      pokemon_id: 0,
      pokemon_name: '',
      type_id: 0,
      user_id: 0,
  }
    // Marcar el Pokémon como favorito
    const addPokemon = await pokemon.addPokemonToFavorites({parseInt(id, 10), true});
    res.json(addPokemon);
  } catch (error) {
    res.status(500).json({ message: 'Error al marcar el Pokémon como favorito' });
  }
});

// Eliminar pokemon
app.delete('/pokemon/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.pokemon.delete({
      where: { id: parseInt(id, 10) },
    });
    res.json({ message: 'Pokémon eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el Pokémon' });
  }
});

export default app;
