import Router from '@koa/router'
import * as Todos from '#components/todos/todos-controller.js'


const todos = new Router()
const todo = [
    {
        id: 1,
        title: 'Acheter des patates'
    },
    {
        id: 2,
        title: 'Acheter des pommes'
    },
    {
        id: 3,
        title: 'Acheter des bananes'
    }
]


todos.get('/', Todos.index)
    .get('/:id', Todos.findOne)
    .put('/:id', Todos.updateOne)
    .delete('/:id', Todos.deleteOne)
    .post('/', Todos.create)

export default todos