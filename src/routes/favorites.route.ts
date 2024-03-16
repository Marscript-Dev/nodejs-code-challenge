import express from 'express';
import { add, getAll, remove } from '../controllers/favorites.controller';
import userPokemonValidatorMiddleware from '../core/middlewares/user-pokemon-validator.middleware';
import tokenValidatorMiddleware from '../core/middlewares/token-validator.middleware';
import userValidatorMiddleware from '../core/middlewares/user-validator.middleware';

const router = express.Router();

router.put(
  '/:userId/:pokemonId',
  [tokenValidatorMiddleware, userPokemonValidatorMiddleware],
  add
);
router.delete(
  '/:userId/:pokemonId',
  [tokenValidatorMiddleware, userPokemonValidatorMiddleware],
  remove
);
router.get('/:userId', [tokenValidatorMiddleware, userValidatorMiddleware], getAll);

export default router;
