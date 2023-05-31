import mongoose from "mongoose";

const Rice = new mongoose.Schema({
    name: {
        type: String, 
        unique: true,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    details: {
        type: String, 
        required: true
    },
    rate: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    }
})

export default mongoose.model("Rice", Rice)