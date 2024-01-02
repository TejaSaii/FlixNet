import express from 'express';
const app = express();
import authRoutes from './routes/auth';
import videoRoutes from './routes/video'
import mongoose from "mongoose";
const port = 3000;
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const dbhost = process.env.DB_HOST as string;
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/app", videoRoutes);
//add middleware for movies route

app.listen(port, () => {
  console.log(`Example app running at ${port}`)
})

//connect mongo using mongoose
mongoose.connect(dbhost);