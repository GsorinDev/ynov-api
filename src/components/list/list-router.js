import Router from '@koa/router'
import * as List from '#components/list/list-controller.js'
import isAuthentificateWithUser from "#middlewares/jwt-handler.js";
import tasks from "#components/tasks/tasks-router.js";


const list = new Router()

list.use(['/','/:id'], isAuthentificateWithUser)

list.get('/', List.index)
    .get('/:id', List.findOne)
    .put('/:id', List.updateOne)
    .delete('/:id', List.deleteOne)
    .post('/', List.create)

export default list