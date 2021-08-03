import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class HomeController {

  /**
   * index
   */
  public async index({view}: HttpContextContract) {
    return view.render('welcome',{title: 'MyApp|MyTask'})
  }
}
