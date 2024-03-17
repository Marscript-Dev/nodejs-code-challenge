import express from 'express';
import { getPokemons, getPokemonFromApi, insertPokemon, getPokemonByName } from '../services/Pokemon';
import { insertFavorite, getFavorite } from '../services/Favorite';
import { IPokemonApi } from '../models/api/Pokemon';
import { getUserId } from '../middleware/AuthToken';
import { IPokemon } from '../models/Pokemon';
import { insertType } from '../services/Type';
import { insertPokemonType } from '../services/PokemonType';
import { IPokemonType } from '../models/PokemonType';
const router = express.Router();
router.get('/', (req, res) => {
    const id = getUserId(req);
    getPokemons(id).then((result)=>{
        res.json( { code:200, error: "", message: '', pokemons: result } )
    }).catch((error)=>{
        res.json( { code:500,error: error.toString(), message: 'internal error' } )
    });    
});
router.post('/add/:name',  async (req, res)=>{
    const PokemonName = req.params.name;
    const UserId = getUserId(req);
    if(PokemonName==""){
        res.status(400).json({code:400, error:"Missing parameters"});
        return;
    }
    const checkPokemon =await getPokemonByName(PokemonName, UserId);
    if(checkPokemon!=null){
        res.status(200).json({code:200, error: '', message: 'You already have this pokemon'});
        return;
    }
    try{
        
        const pokemonResponse = await getPokemonFromApi(PokemonName);
        if(!pokemonResponse.ok){
            res.status(404).json({code:404, error: pokemonResponse.statusText, message: ''});
            return;
        }
        const { name, id, types, abilities, game_indices }= (await pokemonResponse.json()) as any as IPokemonApi
        const newPokemon : IPokemon = {
            PokemonId: id,
            UserId: UserId,
            Name: name,
            Id: id,
            Games: game_indices.map(game=>game.version.name).join(','),
            Abilities: abilities.map(ability=>ability.ability.name).join(',')
        }
        
        const pokemonDb = await insertPokemon(newPokemon);
        types.forEach(async (type,index,array)=>{
            const typeDB =  await insertType(type.type.name); 
            const pokemonType: IPokemonType = {Id:pokemonDb.Id, PokemonId: newPokemon.Id,TypeId: typeDB.Id, CreationDate: new Date()};
            await insertPokemonType(pokemonType);
        });
        res.json({code:200, error: "", message: "success"})
    }
    catch(error: any){
        res.status(500).json({code:500, error: error.toString(), message: "internal error"})
    }
});
router.post('/favorites/add/:name',async (req, res)=>{
    const name = req.params.name;
    if(name == ""){
        res.status(400).json({code:400, error:"Missing parameters"});
        return;
    }
    const UserId = getUserId(req);
    const pokemon = await getPokemonByName(name, UserId);
    if(pokemon==null){       
        res.status(404).json({code:404, error: "Not found", message: "You don't have with that pokemon"})
        return;
    }
    const favorite = await  getFavorite(pokemon!.Id, UserId);
    if(favorite!=null)
    {
        res.status(200).json({code:200, error: "", message: "you already have this pokemon as a favorite"})
        return;
    }
    await insertFavorite(pokemon!.Id,UserId)
    res.json({code:200, error: "", message: "success"})
    
    
});
export default router;