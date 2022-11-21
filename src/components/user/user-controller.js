import Joi from 'joi'
import * as argon2 from "argon2";
import UserModel from "#components/user/user-model.js";

export async function register(ctx){
    try {
        const registerValidationSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            terms_and_conditions: Joi.boolean().valid(true).required()
        })

        const params = ctx.request.body
        const {error, value} = registerValidationSchema.validate(params)

        const hashPassword = await argon2.hash(value.password)

        const newUser = new UserModel({
            ...value,
            password:hashPassword,
            settings: {
                terms_and_conditions: value.terms_and_conditions
            }
        })
        newUser.generateEmailVerificationToken()
        const user = await newUser.save()
        if(error) throw new Error(error)

        ctx.ok(user)
    } catch (e) {
        ctx.badRequest({message:e.message})
    }
}

export async function login(ctx){

}