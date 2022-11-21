import Router from '@koa/router'
import * as List from '#components/list/list-controller.js'


const list = new Router()

list.get('/', List.index)
    .get('/:id', List.findOne)
    .put('/:id', List.updateOne)
    .delete('/:id', List.deleteOne)
    .post('/', List.create)

export default list