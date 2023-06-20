import express from 'express'
import mongoose from 'mongoose'
import routes from './routes';
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const dbPassword = process.env.DB_PASSWORD;
const dbUsername = process.env.DB_USERNAME;

mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@cluster0.66smnzd.mongodb.net/?retryWrites=true&w=majority`)


//middlewawres

app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log(`🔥 Server is running on port ${port} 🔥`);
})


module.exports = app;