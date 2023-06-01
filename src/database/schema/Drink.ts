import mongoose from "mongoose";

const Drink = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    }
})


export default mongoose.model('Drink', Drink)