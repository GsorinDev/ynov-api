import Tasks from "#components/tasks/tasks-model.js";
import Joi from 'joi'

export async function index (ctx) {
    try {
        ctx.body = await Tasks.find({createBy : ctx.state.user._id})
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
            ctx.request.body.createBy = ctx.state.user._id
            Tasks.create(ctx.request.body)
            ctx.status = 204
        }

    } catch (e) {
        ctx.badRequest({message : e.message})
    }
}

export async function deleteOne(ctx) {
    try {
        const task = await Tasks.findOne({_id :ctx.params.id})
        if(task.createBy.toString() !== ctx.state.user._id.toString()) {
            ctx.unauthorized()
        } else {
            await Tasks.findOneAndRemove(ctx.params.id)
            ctx.status = 204
        }

    } catch (e) {
        ctx.badRequest({message : e.message})
    }
}

export async function findOne(ctx) {
    try {
        const task = await Tasks.findById(ctx.params.id)
        if(task.createBy.toString() !== ctx.state.user._id.toString()) {
            ctx.unauthorized()
        } else {
            ctx.body = task
        }

    } catch (e) {
        ctx.badRequest({message : e.message})
    }
}

export async function findAllByListId(ctx) {
    try {
        const taskByList = await Tasks.findByListId(ctx.params.listId)

        taskByList.forEach(task => {
            if(task.createBy.toString() !== ctx.state.user._id.toString()) {
                taskByList.splice(1,taskByList.indexOf(task))
            }
        })
        ctx.body = taskByList

    } catch (e) {
        ctx.badRequest({message : e.message})
    }
}

export async function updateOne(ctx) {
    try {
        const task = await Tasks.findById(ctx.params.id)
        if(task.createBy.toString() !== ctx.state.user._id.toString()) {
            ctx.unauthorized()
        } else {
            await Tasks.findOneAndUpdate(task._id,  ctx.request.body)
            ctx.status = 204
        }
    } catch (e) {
        ctx.badRequest({message : e.message})
    }
}