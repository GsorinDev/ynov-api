import Router from "@koa/router";
import tasks from '#components/tasks/tasks-router.js'
const API_V1_ROUTER = new Router({prefix:'/api/v1'})

API_V1_ROUTER.use('/tasks', tasks.routes(), tasks.allowedMethods())

export {API_V1_ROUTER}