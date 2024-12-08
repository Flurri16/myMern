import express from "express";
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import { getMe, login, register } from "./controllers/auth.js";
import { checkAuth } from "./utils/checkAuth.js";

const app = express()
dotenv.config()

//Constants
const PORT = process.env.PORT
const DB_NAME= process.env.DB_NAME
const DB_PASSWORD= process.env.DB_PASSWORD
const DB_USER= process.env.DB_USER

// Middlewares
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/auth/register', register)
app.use('/api/auth/login', login)
app.use('/auth/me', checkAuth, getMe)
async function start() {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.725qg.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
        )
        app.listen(PORT, () => console.log(`Started on PORT ${PORT}`))
    } catch(err) {
        console.log(err)
    }
}
start()