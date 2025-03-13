import router from '@adonisjs/core/services/router'
import data from '../data/data.json' with { type: 'json' }
import Cocktail from '#models/cocktail'
import Ingredient from '#models/ingredient'

router.get('/', async ({ response }) => {
  for (const cocktail of data) {
    await Cocktail.create({
      id: cocktail.id,
      name: cocktail.name,
      category: cocktail.category,
      glass: cocktail.glass,
      tags: String(cocktail.tags) ?? undefined,
      instructions: cocktail.instructions,
      imageUrl: cocktail.imageUrl,
      alcoholic: Boolean(cocktail.alcoholic),
    })
    for (const ingredient of cocktail.ingredients) {
      const dbIngredient = await Ingredient.findBy('id', ingredient.id)
      if (dbIngredient) {
        continue
      }
      await Ingredient.create({
        name: ingredient.name,
        description: String(ingredient.description),
        alcohol: Boolean(ingredient.alcohol) ?? undefined,
        type: ingredient.type ?? undefined,
        percentage: ingredient.percentage ?? undefined,
        imageUrl: ingredient.imageUrl ?? undefined,
        cocktailId: cocktail.id,
      })
    }
  }

  response.status(200).json({ name: 'Hello' })
})

///CRUD IMPLEMENTATION FOR COCKTAILS

//Create
router.post('/cocktails', async ({ response, request }) => {
  const { name, category, glass, tags, instructions, imageUrl, alcoholic } = request.body()
  await Cocktail.create({ name, category, glass, tags, instructions, imageUrl, alcoholic })

  response.status(201).send({ message: 'Record has been created successfully.' })
})

//Read
router.get('/cocktails/:id', async ({ response, request }) => {
  const { id } = request.params()
  const id1 = parseInt(id)
  const cocktail = await Cocktail.findBy('id', id1)
  response.status(200).send(cocktail)
})

//Read all
router.get('/cocktails', async ({ response, request }) => {
  const cocktails = await Cocktail.all()
  response.status(200).send(cocktails)
})

//Update
router.put('/cocktails/:id', async ({ response, request }) => {
  const { id } = request.params()
  const { name, category, glass, tags, instructions, imageUrl, alcoholic } = request.body()
  const id1 = parseInt(id)
  const cocktail = await Cocktail.findOrFail(id1)
  cocktail.merge({ name, category, glass, tags, instructions, imageUrl, alcoholic })
  await cocktail.save()
  response.status(201).send({ message: 'Record has been updated successfully.' })
})

//Delete
router.delete('/cocktails/:id', async ({ response, request }) => {
  const { id } = request.params()
  const id1 = parseInt(id)
  const cocktail = await Cocktail.findOrFail(id1)
  await cocktail.delete()
  response.status(200).send({ message: 'Record has been deleted successfully.' })
})

///CRUD IMPLEMENTATION FOR INGREDIENTS

router.post('/ingredients', async ({ response, request }) => {
  const { name, description, alcohol, type, percentage, imageUrl, cocktailId } = request.body()
  await Ingredient.create({ name, description, alcohol, type, percentage, imageUrl, cocktailId })

  response.status(201).send({ message: 'Record has been created successfully.' })
})

//Read
router.get('/ingredients/:id', async ({ response, request }) => {
  const { id } = request.params()
  const id1 = parseInt(id)
  const ingredient = await Ingredient.findBy('id', id1)
  response.status(200).send(ingredient)
})

//Read all
router.get('/ingredients', async ({ response, request }) => {
  const ingredients = await Ingredient.all()
  response.status(200).send(ingredients)
})

//Update
router.put('/ingredients/:id', async ({ response, request }) => {
  const { id } = request.params()
  const { name, description, alcohol, type, percentage, imageUrl, cocktailId } = request.body()
  const id1 = parseInt(id)
  const ingredient = await Ingredient.findOrFail(id1)
  await ingredient.merge({ name, description, alcohol, type, percentage, imageUrl, cocktailId })
  await ingredient.save()
  response.status(201).send({ message: 'Record has been updated successfully.' })
})

//Delete
router.delete('/ingredients/:id', async ({ response, request }) => {
  const { id } = request.params()
  const id1 = parseInt(id)
  const ingredient = await Ingredient.findOrFail(id1)
  await ingredient.delete()
  response.status(200).send({ message: 'Record has been deleted successfully.' })
})

//Add ingredient to cocktail
router.post('/cocktails/:id/ingredients', async ({ response, request, params }) => {
  const { id } = params
  const { name, description, alcohol, type, percentage, imageUrl } = request.body()
  const id1 = parseInt(id)
  const cocktail = await Cocktail.findBy('id', id1)
  if (!cocktail) {
    return response.status(404).send({ message: 'Cocktail not found' })
  }
  await Ingredient.create({ name, description, alcohol, type, percentage, imageUrl, cocktailId: id1 })
  response.status(201).send({ message: 'Record has been added successfully.' })
})
