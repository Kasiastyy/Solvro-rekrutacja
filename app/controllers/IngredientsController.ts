import Ingredient from '#models/ingredient';
import Cocktail from '#models/cocktail';

export default class IngredientsController {
  async store({ request, response }) {
    const { name, description, alcohol, type, percentage, imageUrl, cocktailId } = request.body();
    await Ingredient.create({ name, description, alcohol, type, percentage, imageUrl, cocktailId });

    response.status(201).send({ message: 'Record has been created successfully.' });
  }

  async show({ request, response }) {
    const { id } = request.params();
    const ingredient = await Ingredient.findBy('id', parseInt(id));
    response.status(200).send(ingredient);
  }

  async index({ response }) {
    const ingredients = await Ingredient.all();
    response.status(200).send(ingredients);
  }

  async update({ request, response }) {
    const { id } = request.params();
    const id1 = parseInt(id);
    const { name, description, alcohol, type, percentage, imageUrl, cocktailId } = request.body();
    const ingredient = await Ingredient.findOrFail(id1);
    await ingredient.merge({ name, description, alcohol, type, percentage, imageUrl, cocktailId });
    await ingredient.save();
    response.status(201).send({ message: 'Record has been updated successfully.' });
  }

  async destroy({ request, response }) {
    const { id } = request.params();
    const ingredient = await Ingredient.findOrFail(parseInt(id));
    await ingredient.delete();
    response.status(200).send({ message: 'Record has been deleted successfully.' });
  }
}
