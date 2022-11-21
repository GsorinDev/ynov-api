import '#config/database.js'
import Koa from 'koa'
import { API_V1_ROUTER } from '#routes/index.js'
import bodyParser from 'koa-bodyparser'
import Tasks from '#components/tasks/tasks-model.js'
import respond from 'koa-respond'

const app = new Koa()

app
    .use(bodyParser())
    .use(respond())
    .use(API_V1_ROUTER.routes())
    .use(API_V1_ROUTER.allowedMethods())

app.listen(process.env.PORT, () =>
{
    console.log(`Lien : http://localhost:${process.env.PORT}`)
})