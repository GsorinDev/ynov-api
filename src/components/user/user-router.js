import Router from '@koa/router'
import * as User from '#components/user/user-controller.js'
import isAuthentificateWithUser from "#middlewares/jwt-handler.js";


const user = new Router()

user.post('/register', User.register)
    .post('/login', User.login)
    .put('/profile', isAuthentificateWithUser, User.profile)
    .post('/forgetPassword', User.forgetPassword)
    .post('/code', User.verifyRescueCode)
    .post('/changePassword', User.changePassword)

export default user