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
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/','HomeController.index').as('home')
Route.group(() => {
  Route.get('/todos','TodosController.index').as('todo.index')
  Route.get('/todo/create','TodosController.create').as('todo.create')
  Route.post('/todo/store','TodosController.store').as('todo.store')
  Route.get('/todo/:id/edit','TodosController.edit').as('todo.edit')
  Route.put('/todo/update/:id','TodosController.update').as('todo.update')
  Route.put('/todo/change/:id','TodosController.change').as('todo.change')
  Route.delete('/todo/destroy/:id','TodosController.destroy').as('todo.destroy')

}).middleware(['auth'])



/**

 * Auth
 */

Route.get('/login', 'Auth/AuthController.login').as('login').middleware(['guest'])
Route.post('/login/check', 'Auth/AuthController.check').as('login.check')
Route.get('/register', 'Auth/AuthController.register').as('register')
Route.post('/register', 'Auth/AuthController.store').as('register.store')
Route.post('/logout', 'Auth/AuthController.logout').as('logout')


