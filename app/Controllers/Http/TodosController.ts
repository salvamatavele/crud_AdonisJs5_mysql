import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Todo from 'App/Models/Todo';
import TodoValidator from 'App/Validators/TodoValidator';

export default class TodosController {

  /**
   * index
   */
  public async index({view, auth}: HttpContextContract) {
    const user = auth.user
    await user?.load('todos')
    return view.render('todo/index',{
      title: 'Todo List',
      todos: user?.todos.map((todo) => todo.toJSON())
    })
  }

  /**
   * create
   */
   public  create({view}: HttpContextContract) {
    return view.render('todo/create_edit',{
      title: 'New To Do'
    })
  }

  /**
   * store
{request, response}: HttpContextContract   */
  public async store({request, response, session, auth}: HttpContextContract) {
    const validate =  await request.validate(TodoValidator)
    const todo = await auth.user?.related('todos').create(validate)
    if (todo) {
      session.flash('success','The todo have been saved successfuly.')
    } else {
      session.flash('error','The todo have been saved successfuly.')
    }
    response.redirect().back()
  }

  /**
   * change
   */
  public async change({request, response, session, params}: HttpContextContract) {

    const todo = await Todo.findOrFail(params.id)
    todo.done = (request.input('done') === 'on')? 'off':'on'
    if (await todo.save()) {
      session.flash('success','Changed')
    } else {
      session.flash('error','Not changed')
    }

    return response.redirect().back()
  }

  /**
   * edit
   */
  public async edit({view, params}: HttpContextContract) {

    const todo = await Todo.findOrFail(params.id)
    return view.render('todo/todo',{
      title: 'Edit To Do ' + todo.title,
      todo: todo.toJSON()
    })
  }

  /**
   * update
   */
  public async update({request, response, session, params}: HttpContextContract) {
    const validate =  await request.validate(TodoValidator)

    const todo = await Todo.findOrFail(params.id)
    const saved = await todo.merge(validate).save()
    if (saved) {
      session.flash('success','To do updated successfuly')
    } else {
      session.flash('error','Ooops...has not updated. Please try again')
    }
    return response.redirect().back()
  }

  /**
   * destroy
   */
  public async destroy({params, session, response}: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)
    try {
      await todo.delete()
      session.flash('success','To Do deleted')
    } catch (error) {
      session.flash('error','To Do not deleted')
    }

    return response.redirect().back()
  }
}
