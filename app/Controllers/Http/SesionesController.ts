import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sesione from 'App/Models/Sesione'

export default class SesionesController {
    public async index({ response }: HttpContextContract) {
        try{
          const sesion = await Sesione.all()
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
            const data = {
                host_id: auth.user?.id,
                cant_jugadores: request.input('cant_jugadores'),
                estado: request.input('estado')
            }

            const sesion = await Sesione.create(data)

            response.ok({message: "se inserto correctamente", data: sesion.id})
        }
        catch(error) {
          return response.badRequest('Error en los datos enviados')
        }
      }
    
      public async show({ params, response }: HttpContextContract) {
        try
        {
          const sesion = await Sesione.findOrFail(params.id)

          response.ok({message: "consulta correcta", data: sesion})

        }
        catch(error){
          response.badRequest({message: "no se encontro la sesion"})
        }
      }
    
      /* public async edit({}: HttpContextContract) {}*/
    
      public async update({ params, request, response }: HttpContextContract) {
          try{
              const sesion = await Sesione.findOrFail(params.id)

              sesion.cant_jugadores=request.input('cant_jugadores')
              sesion.estado=request.input('estado')

              sesion.save()
          }
          catch(error){
            response.badRequest({message: "no se encontro la sesion"})
          }
      }
    
      public async destroy({ params, response }: HttpContextContract) {
          try{
              const sesion = await Sesione.findOrFail(params.id)

              sesion.delete()

              response.ok({message: "eliminacion correcta"})
          }
          catch(error){
            response.badRequest({message: "no se encontro la sesion"})
          }
      } 
}
