import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Sesione extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public host_id: number

  @column()
  public cant_jugadores: number

  @column()
  estado: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
