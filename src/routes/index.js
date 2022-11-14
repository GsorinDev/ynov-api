import Router from "@koa/router";
import todosRoutes from '#components/todos/todos-router.js'
const API_V1_ROUTER = new Router({prefix:'/api/v1'})

API_V1_ROUTER.use('/todos', todosRoutes.routes(), todosRoutes.allowedMethods())

export {API_V1_ROUTER}