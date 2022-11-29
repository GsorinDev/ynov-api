import Router from '@koa/router'
import * as User from '#components/user/user-controller.js'
import isAuthentificateWithUser from "#middlewares/jwt-handler.js";


const user = new Router()

user.post('/register', User.register)
    .post('/login', User.login)
    .put('/profile', isAuthentificateWithUser, User.profile)

export default user