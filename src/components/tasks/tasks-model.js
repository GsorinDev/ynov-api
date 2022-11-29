import {mongoose} from "mongoose"
import user from "#components/user/user-router.js";

const {Schema} = mongoose

const tasksSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type:String
    },
    done: {
        type: Boolean,
        default: false
    },
    list: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'List'
    },
    createBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})

tasksSchema.static({
    findByListId(listId) {
        return this.find({list: listId })
    }
})

const Tasks = mongoose.model('Tasks', tasksSchema)

export default Tasks