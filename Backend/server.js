import express from "express";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound,errorHandler } from "./Middleware/errorMiddleware.js";
import connectDB from "./Config/db.js";
const port = process.env.PORT || 4000;
import userRoutes from './Routes/userRoutes.js';
import adminRoutes from './Routes/adminRoutes.js'

connectDB();
const app = express();
app.use(express.static('Backend/Public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use('/api/users', userRoutes);
app.use('/api/admin',adminRoutes)

app.get('/', (req,res) => res.send('server is ready'))

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`))