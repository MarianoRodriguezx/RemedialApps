import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import RelacionesSesione from 'App/Models/RelacionesSesione'

export default class RelacionesSesionesController {
    public async index({ response }: HttpContextContract) {
        try{
          const sesion = await RelacionesSesione.all()
          response.ok({message: "consulta correcta", data: sesion})
        }
        catch(error)
        {
          response.badRequest("Ocurrio algo malo, checalo")
        }
      }
    
      //public async create({}: HttpContextContract) {}
    
      public async store({ response, request, auth }: HttpContextContract) {
        try{

            const rs = await Database.rawQuery('select count(id) as conteo from relaciones_sesiones where sesion_id=?', [request.input('sesion_id')])
            const rs2 = await Database.rawQuery('select count(id) as conteo from relaciones_sesiones where posicion=?', [request.input('posicion')])

            const rrs = rs[0]
            const rrrs = rrs[0]

            const rrs2 = rs2[0]
            const rrrs2 = rrs2[0]

            if(rrrs['conteo'] != 0 && rrrs2['conteo'] != 0)
            {
                response.badRequest({message: "posicion ocupado", data: false})
            }

            else
            {
                const data = {
                  sesion_id: request.input('sesion_id'),
                  jugador_id: auth.user?.id,
                  posicion: request.input('posicion')
                }

                await RelacionesSesione.create(data)

                response.ok({message: "se inserto correctamente", data: true})
            }

            //const tJugadores = await RelacionesSesione.query().count('sesion_id').where('sesion_id', dato.sesion_id)
        }
        catch(error) {
          return response.badRequest('Error en los datos enviados')
        }
      }

      public async consultaUsuarios({ response, params }: HttpContextContract){
          try{

            //await RelacionesSesione.findOrFail(params.id)

            const tJugadores = await Database.rawQuery('select count(id) as JugadoresActuales from relaciones_sesiones where sesion_id=?', [params.id])
            const Jpermitidos = await Database.rawQuery('select cant_jugadores as JugadoresPermitidos from sesiones where id=?', [params.id])

            response.ok({menssage: "consulta correcta", JugadoresActuales: tJugadores[0], JugadoresPermitidos: Jpermitidos[0] })
          }
          catch(error){
            response.badRequest({message: "no se encontro la sesion"})
          }
      }
    
      public async show({ params, response }: HttpContextContract) {
        try
        {
          const sesion = await RelacionesSesione.findOrFail(params.id)

          response.ok({message: "consulta correcta", data: sesion})

        }
        catch(error){
          response.badRequest({message: "no se encontro la sesion"})
        }
      }
    
      /* public async edit({}: HttpContextContract) {}*/
    
      public async update({ params, request, response }: HttpContextContract) {
          try{
              const sesion = await RelacionesSesione.findOrFail(params.id)

              sesion.posicion=request.input('posicion')

              sesion.save()
          }
          catch(error){
            response.badRequest({message: "no se encontro la sesion"})
          }
      }
    
      public async destroy({ params, response }: HttpContextContract) {
          try{
              const sesion = await RelacionesSesione.findOrFail(params.id)

              sesion.delete()

              response.ok({message: "eliminacion correcta"})
          }
          catch(error){
            response.badRequest({message: "no se encontro la sesion"})
          }
      } 
}
