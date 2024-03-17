import express from "express";
import userRouter from './routes/users';
import pokemonRouter from './routes/pokemons';
import authRouter from './routes/auth';
import AuthToken from "./middleware/AuthToken";
const app = express();
app.use(express.json());
app.use('/api/pokemons', AuthToken, pokemonRouter)
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.listen(process.env.PORT, ()=>{
    console.log(`🚀 Server Running on http://localhost:${process.env.PORT}`);
});