/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('login', 'UsuariosController.login')

Route.resource('users', 'UsuariosController')

Route.resource('relacion_sesiones', 'RelacionesSesionesController')

Route.group(()=> {

  Route.resource('sesiones', 'SesionesController')
  Route.get('consultaUsuarios/:id', 'RelacionesSesionesController.consultaUsuarios')
  
}).middleware(['auth'])

