import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Cocktail from '#models/cocktail'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Ingredient extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare alcohol: boolean

  @column()
  declare type: string

  @column()
  declare percentage: number

  @column()
  declare imageUrl: string

  @column()
  declare cocktailId: number

  // @belongsTo(() => Cocktail)
  // declare public cocktail: BelongsTo<typeof Cocktail>

}
