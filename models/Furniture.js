const { Schema, model } = require("mongoose")
const furnitureSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    isSale:{
        type: Boolean, 
        required: true
    },
    des:{
        type: String,
        required: true
    },
    categoryId:{
        ref: "category",
        type: Schema.Types.ObjectId
    }


})

module.exports = model("furniture", furnitureSchema)