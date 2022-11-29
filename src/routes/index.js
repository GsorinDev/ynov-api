import Router from "@koa/router";
import tasks from '#components/tasks/tasks-router.js'
import listRouter from "#components/list/list-router.js";
import user from "#components/user/user-router.js";
const API_V1_ROUTER = new Router({prefix:'/api/v1'})

API_V1_ROUTER.use('/tasks', tasks.routes(), tasks.allowedMethods())
API_V1_ROUTER.use('/lists', listRouter.routes(), listRouter.allowedMethods())
API_V1_ROUTER.use('/users', user.routes(), user.allowedMethods())

export {API_V1_ROUTER}