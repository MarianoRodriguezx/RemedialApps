import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Sesiones extends BaseSchema {
  protected tableName = 'sesiones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('host_id').unsigned().references('id').inTable('users')
      table.integer('cant_jugadores')
      table.string('estado')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
