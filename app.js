process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

import '#config/database.js'
import Koa from 'koa'
import { API_V1_ROUTER } from '#routes/index.js'
import bodyParser from 'koa-bodyparser'
import cors from "@koa/cors"
import Tasks from '#components/tasks/tasks-model.js'
import List from "#components/list/list-model.js";
import User from "#components/user/user-model.js";
import respond from 'koa-respond'
import '#config/maildev.js'

const app = new Koa()

app
    .use(bodyParser())
    .use(respond())
    .use(cors({origin: "*"}))
    .use(API_V1_ROUTER.routes())
    .use(API_V1_ROUTER.allowedMethods())

app.listen(process.env.PORT, () =>
{
    console.log(`Lien : http://localhost:${process.env.PORT}`)
})