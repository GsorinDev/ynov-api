import List from "#components/list/list-model.js";
import Joi from 'joi'
import TasksModel from "#components/tasks/tasks-model.js";

export async function index (ctx) {
    try {
        ctx.body = await List.find({createBy : ctx.state.user._id})
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
            ctx.request.body.createBy = ctx.state.user._id
            List.create(ctx.request.body)
            ctx.status = 204
        }

    } catch (e) {
        ctx.badRequest({message : e.message})
    }
}

export async function deleteOne(ctx) {

    try {
        const list = await List.findOne({_id :ctx.params.id})
        if(list.createBy.toString() !== ctx.state.user._id.toString()) {
            ctx.unauthorized()
        } else {
            await List.findOneAndRemove(ctx.params.id)
            ctx.status = 204
        }
    } catch (e) {
        ctx.badRequest({message : e.message})
    }
}

export async function findOne(ctx) {
    try {
        const list = await List.findById(ctx.params.id).lean()
        if(list.createBy.toString() !== ctx.state.user._id.toString()) {
            ctx.unauthorized()
        } else {
            list.tasks = await TasksModel.findByListId(ctx.params.id)
            await List.findOneAndRemove(ctx.params.id)
            ctx.body = list
        }
    } catch (e) {
        ctx.badRequest({message : e.message})
    }
}

export async function updateOne(ctx) {
    try {
        const list = await List.findById(ctx.params.id).lean()
        if(list.createBy.toString() !== ctx.state.user._id.toString()) {
            ctx.unauthorized()
        } else {
            ctx.request.body.createBy = ctx.state.user._id
            await List.findOneAndUpdate(list._id,  ctx.request.body)
            ctx.status = 204
        }
    } catch (e) {
        ctx.badRequest({message : e.message})
    }
}