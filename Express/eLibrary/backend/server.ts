import express from 'express'
import dotenv from 'dotenv'
import {readFileSync} from 'fs'
import path from 'path'
import cors from 'cors'
import pool from './config/db'

//configure dotenv
dotenv.config()

//enable instnace of express
const app = express()

//port variables
const port = process.env.PORT
console.log(port)

//enable CORS
app.use(cors({
    origin: "http://localhost:5174",
    methods: "GET, POST, PUT, DELETE",
    credentials: true //allows cookies and auth headers
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//server
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
})