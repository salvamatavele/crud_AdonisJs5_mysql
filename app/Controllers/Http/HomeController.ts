import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import View from "@ioc:Adonis/Core/View";

export default class HomeController {

  /**
   * index
   */
  public async index({view}: HttpContextContract) {
    return view.render('welcome',{title: 'MyApp|MyTask'})
  }
}
