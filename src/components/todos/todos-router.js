import Router from '@koa/router'
import * as Todos from '#components/todos/todos-controller.js'


const todos = new Router()

todos.get('/', Todos.index)
    .get('/:id', Todos.findOne)
    .put('/:id', Todos.updateOne)
    .delete('/:id', Todos.deleteOne)
    .post('/', Todos.create)

export default todos