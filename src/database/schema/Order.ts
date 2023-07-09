import mongoose from "mongoose";

const Order = new mongoose.Schema({
    _id: {
        type: String
    },
    food: {
        type: Object
    },
    quantity: {
        type: Number
    },
    details: {
        type: String
    },
    status: {
        type: String
    },
    totalPrice: {
        type: String
    }
})

export default mongoose.model("Order", Order)