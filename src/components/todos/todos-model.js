import {mongoose} from "mongoose"

const {Schema} = mongoose

const todosSchemas = new Schema({
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
    }
})

const Todos = mongoose.model('Todos', todosSchemas)

const findAll = async (option = {}) => {
    const todos = await Todos.find()
    console.log(`=============== Find All ================ \n ${todos} \n==========================================`)
}

const findById = async (id) => {
    const todo = await Todos.findById(id)
    console.log(`=============== Find By Id ================ \n ${todo} \n==========================================`)
}

const updateById = async (id, name) => {
    const todo = await Todos.updateOne({_id: id}, {$set : {name: name}})
    console.log(`=============== Update By Id ================ \n ${todo} \n==========================================`)
}

const deleteById = async(id) => {
    const todo = await Todos.deleteOne({_id: id})
    console.log(`=============== Delete By Id ================ \n ${todo} \n==========================================`)
}

const insertOne = async (obj) => {
    const todo = await Todos.insertOne(obj)
    console.log(`=============== Insert One ================ \n ${todo} \n==========================================`)
}

export default Todos