import Todos from "#components/todos/todos-model.js";
import Joi from 'joi'

export async function index (ctx) {
    try {
        ctx.body = await Todos.find()
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function create(ctx) {
    try {
        const todoValidationSchema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().optional(),
            colors: Joi.array().has(Joi.string().optional()).optional(),
            price: Joi.number().required()
        })

        const {error} = todoValidationSchema.validate(ctx.request.body)

        let json = ctx.request.body
        json.createdAt = Date.now()

        if (error) {
            throw new Error(error)
        } else {
            Todos.create(json)
            ctx.status = 204
        }

    } catch (e) {
        ctx.badRequest({message : e.message})
    }
}

export async function deleteOne(ctx) {
    try {
        await Todos.findOneAndRemove(ctx.params.id)
        ctx.status = 204
    } catch (e) {
        ctx.badRequest({message : e.message})
    }
}

export async function findOne(ctx) {
    try {
        ctx.body = await Todos.findById(ctx.params.id)
    } catch (e) {
        ctx.badRequest({message : e.message})
    }
}

export async function updateOne(ctx) {
    try {
        console.log(ctx.params.id)
        let json = ctx.request.body
        json.updatedAt = Date.now()

        await Todos.findOneAndUpdate(ctx.params.id, json)
        ctx.status = 204
    } catch (e) {
        ctx.badRequest({message : e.message})
    }
}