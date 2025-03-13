import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ingredients'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.text('name').notNullable()
      table.text('description').nullable()
      table.boolean('alcohol').notNullable()
      table.text('type').nullable()
      table.integer('percentage').nullable()
      table.text('image_url').nullable()
      table.integer('cocktail_id').unsigned().references('cocktails.id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
