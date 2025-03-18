// routes.js
import router from '@adonisjs/core/services/router';
import CocktailsController from '#controllers/CocktailsController';
import IngredientsController from '#controllers/IngredientsController';
import { seedDatabase } from '#database/seeders/seeder';

// Base route for testing
router.get('/', async ({ response }) => {
  response.status(200).json({ message: 'Hi' });
});

// Seeder route
router.get('/seed', async ({ response }) => {
  await seedDatabase();
  response.status(200).json({ message: 'Database seeded successfully' });
});

// Resource routes
router.resource('cocktails', CocktailsController);
router.resource('ingredients', IngredientsController);
router.post('cocktails/:id/ingredients', '#controllers/CocktailsController.addToCocktail');
