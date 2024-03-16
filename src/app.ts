import express from 'express';
import userRoutes from './routes/UserRoutes';
import pokemonRoutes from './routes/PokemonRoutes';

const app = express();

app.use(express.json());

app.use('/user', userRoutes);

app.use('/pokemon', pokemonRoutes);

export default app;