import mongoose from "mongoose";

const Order = new mongoose.Schema({
    _id: {
        type: String,
    },
    food: {
        type: Object,
    },
    details: {
        type: String,
    },
    totalPrice: {
        type: String
    }
})

export default mongoose.model("Order", Order)