import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsuariosController {
  public async index({ response }: HttpContextContract) {
    try{
      const user = await User.all()

      response.ok({message: "Consulta Correcta", data: user})
    }
    catch(error)
    {
      response.badRequest("Ocurrio algo malo, checalo")
    }
  }

  public async login({ request, response, auth }: HttpContextContract)
  {
    const email = request.input('email')
    const password = request.input('password')

    try {

      const token = await auth.use('api').attempt(email, password)
      response.ok({message: "Inicio de sesion exitoso", token: token})

    } 
    catch(error) {
      return response.badRequest('Datos de inicio erroneos')
    }
  }
  //public async create({}: HttpContextContract) {}

  public async store({ response, request, auth }: HttpContextContract) {
    //try{
      const password = request.input('password')
      const data = request.all()

      const user = await User.create(data)

      const token = await auth.use('api').attempt(user.email, password)

      response.ok({message: "Registro e Inicio de sesion exitoso", token})
    //}
    //catch(error) {
    //  return response.badRequest('Error en los datos enviados')
    //}
  }

  public async show({ params, response }: HttpContextContract) {
    try
    {
      const user = await User.findOrFail(params.id)

      response.ok({message: "Usuario encontrado", data: user})
    }
    catch(error){
      response.badRequest({message: "no se encontro el usuario"})
    }
  }

  /* public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {} */
}
