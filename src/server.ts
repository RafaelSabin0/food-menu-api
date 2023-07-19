import express from 'express'
import mongoose from 'mongoose'
import routes from './routes';
import dotenv from "dotenv";
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from "../swagger.json";
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const dbPassword = process.env.DB_PASSWORD;
const dbUsername = process.env.DB_USERNAME;

mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@cluster0.66smnzd.mongodb.net/?retryWrites=true&w=majority`)


//middlewawres

app.use(express.json())
app.use(cors())
app.use(routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`🔥 Server is running on port ${port} 🔥`);
})


module.exports = app;