import {mongoose} from "mongoose";

mongoose.connect("mongodb://localhost:27017/ynov-api")
    .then(() => console.log("Mongo connected at Ynov-api database"))
    .catch((e) => console.error(`Error during initialisation ${e}`))