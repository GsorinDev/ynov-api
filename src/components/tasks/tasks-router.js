import Router from '@koa/router'
import * as Tasks from '#components/tasks/tasks-controller.js'


const tasks = new Router()

tasks.get('/', Tasks.index)
    .get('/:id', Tasks.findOne)
    .put('/:id', Tasks.updateOne)
    .delete('/:id', Tasks.deleteOne)
    .post('/', Tasks.create)

export default tasks