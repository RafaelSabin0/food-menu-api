import mongoose from "mongoose";

const Order = new mongoose.Schema({
    _id: {
        type: String
    },
    orderItems: {
        type: Object
    },
    details: {
        type: String
    },
    orderStatus: {
        type: String
    },
    orderDate: {
        type: Date
    },
    totalPrice: {
        type: String
    }
})

export default mongoose.model("Order", Order)