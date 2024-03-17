// Importar Express y otras dependencias
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import * as Pokemon from '../services/PokemonService';
import * as Auth from '../middleware/Auth';

dotenv.config();

const app = express.Router();

// **** Agregar Pokémon *****************************************
app.post('/add', async (req, res) => {
  const { pokemon } = req.body;
  try {    
    const user = await Auth.getUser(req, res);

    const response = await Pokemon.getApiPokemon(pokemon, user.user_id);    

    if(!response) {
      return res.status(404).json({ message: 'Pokémon no encontrado' });
    }

    const pokemonAdd = await Pokemon.addPokemonToUser(response);
    res.json(pokemonAdd);

  } catch (error: any) {
    res.status(400).json({ message: error.toString() });
  }
});

// **** Obtener Pokémons por usuario ********************************
app.get('/list', async (req, res) => {
  try {
    const user = await Auth.getUser(req, res);
    const pokemons = await Pokemon.getAllUserPokemons(user.user_id);
    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los Pokémon' });
  }
});

// **** Agregar Pokémon como favorito ********************************
app.post('/favorite/', async (req: Request, res: Response) => {
  const { pokemon } = req.body;
  const user = await Auth.getUser(req, res);
  try {
    // Verificar si el Pokémon existe y pertenece al usuario
    let pokemonExist = await Pokemon.getPokemonById(parseInt(pokemon, 10), user.user_id);
    
    //Si el pokemon no ha sido atrapado, lo atrapamos y agregamos a favoritos
    if (pokemonExist === null) {
      
      const pokemonApi = await Pokemon.getApiPokemon(pokemon, user.user_id);
      if(pokemonApi === null) {
        return res.status(404).json({ message: 'Pokémon no encontrado' });
      }
      //Agregamos el Pokémon a la colección
      pokemonExist = await Pokemon.addPokemonToUser(pokemonApi!);
      
    } 
    const addPokemon = await Pokemon.addPokemonToFavorites(
      user.user_id,
      pokemonExist.user_pokemon_id, 
    );
    res.json(addPokemon);
    
  } catch (error) {
    res.status(500).json({ message: 'Error al marcar el Pokémon como favorito' });    
  }
});

// **** Eliminar Pokémon de los atrapados ********************************
app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Auth.getUser(req, res);
    await Pokemon.deletePokemonById(parseInt(id, 10), user.user_id);

    res.json({ message: 'Pokémon eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el Pokémon' });
  }
});

// **** Eliminar Pokémon de los favoritos ********************************
app.delete('/favorite/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Auth.getUser(req, res);
    await Pokemon.deleteFavoritePokemonById(parseInt(id, 10), user.user_id);
    res.json({ message: 'Pokémon eliminado de Favoritos correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el Pokémon Favorito' });
  }
});

export default app;
