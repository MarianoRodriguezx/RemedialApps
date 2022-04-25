import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class RelacionesSesione extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public sesion_id: number

  @column()
  public jugador_id: number

  @column()
  public posicion: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
