import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Ingredient from '#models/ingredient'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Cocktail extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare name: string

  @column()
  declare category: string

  @column()
  declare glass: string

  @column()
  declare tags: string

  @column()
  declare instructions: string

  @column()
  declare imageUrl: string

  @column()
  declare alcoholic: boolean

  @hasMany(() => Ingredient)
  declare ingredients: HasMany<typeof Ingredient>
}
