import data from '../../data/data.json' with { type: 'json' }
import Cocktail from '#models/cocktail'
import Ingredient from '#models/ingredient'

export async function seedDatabase() {
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
}
