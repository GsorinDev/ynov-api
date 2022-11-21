import {mongoose} from "mongoose"

const {Schema} = mongoose

const listSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})

const List = mongoose.model('List', listSchema)

// const newList = new List({title: 'Courses', tasks: [{'title': 'Acheter des patates'},{'title': 'Acheter des Pommes'}]})
// newList.tasks[0].title = "Acheter des pommes de terre"

// newList.save()


export default List