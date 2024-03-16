import express from 'express';
import { create, getAllByUserId } from '../controllers/pokemon.controller';
import tokenValidatorMiddleware from '../core/middlewares/token-validator.middleware';
import userValidatorMiddleware from '../core/middlewares/user-validator.middleware';
import pokemonValidatorMiddleware from '../core/middlewares/pokemon-validator.middleware';

const router = express.Router();

router.post(
  '/',
  [
    tokenValidatorMiddleware,
    userValidatorMiddleware,
    pokemonValidatorMiddleware,
  ],
  create
);
router.get('/:userId', [tokenValidatorMiddleware], getAllByUserId);

export default router;
