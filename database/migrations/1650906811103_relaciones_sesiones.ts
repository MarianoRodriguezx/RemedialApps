import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RelacionesSesiones extends BaseSchema {
  protected tableName = 'relaciones_sesiones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('sesion_id').unsigned().references('id').inTable('sesiones')
      table.integer('jugador_id').unsigned().references('id').inTable('users')
      table.integer('posicion')

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
