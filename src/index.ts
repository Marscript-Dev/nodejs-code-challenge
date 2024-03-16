import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { apiValidator } from './core/middlewares/schema-validator.middleware';

//routes
import indexRoutes from './routes/index.route';
import userRoutes from './routes/user.route';
import pokemonRoutes from './routes/pokemon.route';
import favoritesRoutes from './routes/favorites.route';

const app = express();

const PORT = process.env.PORT || 4000;

app.use([express.json(), helmet(), cors()]);

app.use(
  '/swagger',
  swaggerUi.serve,
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const swaggerDocument = YAML.load('./swagger.yaml');
    const swaggerUiHandler = swaggerUi.setup(swaggerDocument);
    swaggerUiHandler(req, res, next);
  }
);

app.use(apiValidator());

app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/pokemon', pokemonRoutes);
app.use('/favorites', favoritesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
