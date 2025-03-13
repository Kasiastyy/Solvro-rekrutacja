import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cocktails'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.text('name')
      table.text('category')
      table.text('glass')
      table.text('tags').nullable()
      table.text('instructions')
      table.text('image_url')
      table.boolean('alcoholic')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
