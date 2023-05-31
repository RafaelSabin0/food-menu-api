import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const dbPassword = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://rafaelsabino:${dbPassword}@cluster0.66smnzd.mongodb.net/?retryWrites=true&w=majority`)


//middlewawres

app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log(`🔥 Server is running on port ${port} 🔥`);
})