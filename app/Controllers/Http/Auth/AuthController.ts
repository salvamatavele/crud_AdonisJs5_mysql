import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../../Models/User'
import RegisterValidator from '../../../Validators/RegisterValidator';

export default class AuthController {
  /**
   * login
   */
  public async login({ view }: HttpContextContract) {
    return view.render('auth.login', {
      title: 'Login',
    })
  }

  /**
   * login
   */
  public async check({ request, auth, response, session }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const remember = request.input('remember')
    const rememberMe = (remember == 'on')? true:false
    try {
      await auth.use('web').attempt(email, password, rememberMe)
      response.redirect().toRoute('home')
    } catch (error) {
      session.flash('error', 'Ooops...Email or password invalid')
      response.redirect().back()
    }
  }

  /**
   * login
   */
  public async register({ view }: HttpContextContract) {
    return view.render('auth.register', {
      title: 'Register',
    })
  }

  /**
   * login
   */
  public async store({ request, auth, response, session }: HttpContextContract) {

    const validate = await request.validate(RegisterValidator)

    const user = await User.create(validate)
    if (user) {
      await auth.use('web').login(user)
    } else {
      session.flash('error', 'Ooops...User not registered successfuly')
    }
    response.redirect().toRoute('home')
  }

  /**
   * logout
   */
  public async logout({ auth, response }: HttpContextContract) {
    try {
      await auth.use('web').logout(true)
    } catch (error) {
      return response.badRequest('Erro to logout')
    }
    return response.redirect().toRoute('home')
  }
}
