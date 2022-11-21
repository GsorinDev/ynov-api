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
            title: Joi.string().required(),
            description: Joi.string().optional(),
            done: Joi.boolean().optional(),
            list: Joi.string().required()
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

export async function findAllByListId(ctx) {
    try {
        ctx.body = await Tasks.findByListId(ctx.params.listId)
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