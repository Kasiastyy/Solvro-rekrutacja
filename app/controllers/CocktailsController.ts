import Cocktail from '#models/cocktail'
import Ingredient from '#models/ingredient'
import { HttpContext } from '@adonisjs/core/http'
export default class CocktailsController {

  // Create
  async store({ response, request }: HttpContext) {
    const data = request.only(['name', 'category', 'glass', 'tags', 'instructions', 'imageUrl', 'alcoholic'])
    await Cocktail.create(data)
    response.status(201).send({ message: 'Record has been created successfully.' })
  }

  // Read
  async show({ response, params }: HttpContext) {
    const { id } = params
    const cocktail = await Cocktail.find(id)
    response.status(200).send(cocktail)
  }

  // Read all
  async index({ response }: HttpContext) {
    const cocktails = await Cocktail.all()
    response.status(200).send(cocktails)
  }

  // Update
  async update({ response, request, params }: HttpContext) {
    const { id } = params
    const data = request.only(['name', 'category', 'glass', 'tags', 'instructions', 'imageUrl', 'alcoholic'])
    const cocktail = await Cocktail.findOrFail(id)
    cocktail.merge(data)
    await cocktail.save()
    response.status(200).send({ message: 'Record has been updated successfully.' })
  }

  // Delete
  async destroy({ response, params }: HttpContext) {
    const { id } = params
    const cocktail = await Cocktail.findOrFail(id)
    await cocktail.delete()
    response.status(200).send({ message: 'Record has been deleted successfully.' })
  }

  // Add to cocktail
  async addToCocktail({ request, response, params }: HttpContext) {
    const { id } = params;
    const { name, description, alcohol, type, percentage, imageUrl } = request.body();
    const cocktail = await Cocktail.find(id);

    if (!cocktail) {
      return response.status(404).send({ message: 'Cocktail not found' });
    }

    await Ingredient.create({ name, description, alcohol, type, percentage, imageUrl, cocktailId: cocktail.id });
    response.status(201).send({ message: 'Ingredient added successfully.' });
  }
}
