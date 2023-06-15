import mongoose from "mongoose"


const Category = new mongoose.Schema({
    _id:{
        type: String,
        unique: true,
        required: true
    },  
    category: {
        type: String,
        unique: true,
        required: true
    }
})

export default mongoose.model("Categories", Category)