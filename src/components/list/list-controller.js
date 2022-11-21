import List from "#components/list/list-model.js";
import Joi from 'joi'
import TasksModel from "#components/tasks/tasks-model.js";

export async function index (ctx) {
    try {
        ctx.body = await List.find()
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function create(ctx) {
    try {
        const taskSchemaValidator = Joi.object({
            title: Joi.string().required(),
        })

        const {error} = taskSchemaValidator.validate(ctx.request.body)
        if (error) {
            throw new Error(error)
        } else {
            List.create(ctx.request.body)
            ctx.status = 204
        }

    } catch (e) {
        ctx.badRequest({message : e.message})
    }
}

export async function deleteOne(ctx) {
    try {
        await List.findOneAndRemove(ctx.params.id)
        ctx.status = 204
    } catch (e) {
        ctx.badRequest({message : e.message})
    }
}

export async function findOne(ctx) {
    try {
        const list = await List.findById(ctx.params.id).lean()
        list.tasks = await TasksModel.findByListId(ctx.params.id)

        ctx.body = list
    } catch (e) {
        ctx.badRequest({message : e.message})
    }
}

export async function updateOne(ctx) {
    try {
        await List.findOneAndUpdate(ctx.params.id,  ctx.request.body)
        ctx.status = 204
    } catch (e) {
        ctx.badRequest({message : e.message})
    }
}