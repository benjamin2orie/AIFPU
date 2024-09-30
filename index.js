
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDb from "./config/db.js";
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js';

connectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/api/users',userRoutes);
app.use(cookieParser());

app.get('/', (req,res) =>res.send('server is ready...'));

app.use(notFound);
app.use(errorHandler);



app.listen(port, ()=> console.log(`The server will soon start running on port ${port}`))