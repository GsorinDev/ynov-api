import {mongoose} from "mongoose"

const {Schema} = mongoose

const tasksSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type:String
    },
    colors: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },

}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})

const Tasks = mongoose.model('Tasks', tasksSchema)

const findAll = async (option = {}) => {
    const todos = await Tasks.find()
    console.log(`=============== Find All ================ \n ${todos} \n==========================================`)
}

const findById = async (id) => {
    const todo = await Tasks.findById(id)
    console.log(`=============== Find By Id ================ \n ${todo} \n==========================================`)
}

const updateById = async (id, name) => {
    const todo = await Tasks.updateOne({_id: id}, {$set : {name: name}})
    console.log(`=============== Update By Id ================ \n ${todo} \n==========================================`)
}

const deleteById = async(id) => {
    const todo = await Tasks.deleteOne({_id: id})
    console.log(`=============== Delete By Id ================ \n ${todo} \n==========================================`)
}

const insertOne = async (obj) => {
    const todo = await Tasks.insertOne(obj)
    console.log(`=============== Insert One ================ \n ${todo} \n==========================================`)
}

export default Tasks