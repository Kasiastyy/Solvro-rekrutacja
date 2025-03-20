import Ingredient from '#models/ingredient'
import { HttpContext } from '@adonisjs/core/http'

export default class IngredientsController {
  //Create
  async store({ request, response }: HttpContext) {
    const { name, description, alcohol, type, percentage, imageUrl, cocktailId } = request.body()
    await Ingredient.create({ name, description, alcohol, type, percentage, imageUrl, cocktailId })

    response.status(201).send({ message: 'Record has been created successfully.' })
  }

  //Read
  async show({ request, response }: HttpContext) {
    const { id } = request.params()
    const ingredient = await Ingredient.findBy(id)
    response.status(200).send(ingredient)
  }

  //Read all
  async index({ response }: HttpContext) {
    const ingredients = await Ingredient.all()
    response.status(200).send(ingredients)
  }

  //Update
  async update({ request, response }: HttpContext) {
    const { id } = request.params()
    const { name, description, alcohol, type, percentage, imageUrl, cocktailId } = request.body()
    const ingredient = await Ingredient.findOrFail(id)
    await ingredient.merge({ name, description, alcohol, type, percentage, imageUrl, cocktailId })
    await ingredient.save()
    response.status(201).send({ message: 'Record has been updated successfully.' })
  }

  //Delete
  async destroy({ request, response }: HttpContext) {
    const { id } = request.params()
    const ingredient = await Ingredient.findOrFail(id)
    await ingredient.delete()
    response.status(200).send({ message: 'Record has been deleted successfully.' })
  }
}
