import Tasks from "#components/tasks/tasks-model.js";
import Joi from 'joi'

export async function index (ctx) {
    try {
        ctx.body = await Tasks.find()
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function create(ctx) {
    try {
        const taskSchemaValidator = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().optional(),
            colors: Joi.array().has(Joi.string().optional()).optional(),
            price: Joi.number().required()
        })

        const {error} = taskSchemaValidator.validate(ctx.request.body)
        if (error) {
            throw new Error(error)
        } else {
            Tasks.create(ctx.request.body)
            ctx.status = 204
        }

    } catch (e) {
        ctx.badRequest({message : e.message})
    }
}

export async function deleteOne(ctx) {
    try {
        await Tasks.findOneAndRemove(ctx.params.id)
        ctx.status = 204
    } catch (e) {
        ctx.badRequest({message : e.message})
    }
}

export async function findOne(ctx) {
    try {
        ctx.body = await Tasks.findById(ctx.params.id)
    } catch (e) {
        ctx.badRequest({message : e.message})
    }
}

export async function updateOne(ctx) {
    try {
        await Tasks.findOneAndUpdate(ctx.params.id,  ctx.request.body)
        ctx.status = 204
    } catch (e) {
        ctx.badRequest({message : e.message})
    }
}