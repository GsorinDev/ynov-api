import Router from '@koa/router'
import * as User from '#components/user/user-controller.js'


const user = new Router()

user.post('/register', User.register)
    .post('/login', User.login)

export default user