import Router from '@koa/router'
import * as Tasks from '#components/tasks/tasks-controller.js'
import isAuthentificateWithUser from "#middlewares/jwt-handler.js";

const tasks = new Router()

tasks.get('/', Tasks.index)
    .get('/protected', isAuthentificateWithUser, (ctx) => {
        ctx.ok({message: "this routes is protected", user: ctx.state.user})
    })
    .get('/:id', Tasks.findOne)
    .put('/:id', Tasks.updateOne)
    .delete('/:id', Tasks.deleteOne)
    .post('/', Tasks.create)
    .get('/list/:listId', Tasks.findAllByListId)


export default tasks