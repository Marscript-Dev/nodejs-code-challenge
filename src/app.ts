import express from 'express';
import userRoutes from './routes/UserRoutes';
import pokemonRoutes from './routes/PokemonRoutes';
import * as Auth from './middleware/Auth';

const app = express();

app.use(express.json());

app.use('/user', userRoutes);

app.use('/pokemon', Auth.authenticateToken, pokemonRoutes);

app.listen(3000);

export default app;