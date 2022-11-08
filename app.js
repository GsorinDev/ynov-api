import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from 'koa-bodyparser'

const app = new Koa()
const router = new Router()
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


router.get('/', (ctx, next) => {
    ctx.body = 'Hello !'
})

router.get('/api/todos', (ctx, next) => {
    ctx.body = todo
    })
    .get('/api/todos/:id', (ctx,next) => {
        ctx.body = todo.find((todo) => todo.id === +ctx.params.id)
    })
    .put('/api/todos/:id', (ctx, next) => {
        const objWithIdIndex = todo.findIndex((todo) => todo.id === +ctx.params.id);
        todo[objWithIdIndex].title = ctx.request.body.title
        ctx.status = 204
    })
    .delete('/api/todos/:id', (ctx, next) => {
        const objWithIdIndex = todo.findIndex((todo) => todo.id === +ctx.params.id);
        todo.splice(objWithIdIndex,1)
        ctx.status = 204
    }).post('/api/todos', (ctx) => {
        todo.push({
            id: todo.length+1,
            title: ctx.request.body.title
        })
        ctx.status = 204
    })


app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())



app.listen(process.env.PORT, () =>
{
    console.log(`Lien : http://localhost:${process.env.PORT}`)
})