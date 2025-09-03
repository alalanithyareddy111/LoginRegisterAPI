import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import userRoute from "./routes/userRoute.js"
dotenv.config();

const app=express()
app.use(express.json())
connectDb()
app.use("/api/auth",userRoute)

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
})
