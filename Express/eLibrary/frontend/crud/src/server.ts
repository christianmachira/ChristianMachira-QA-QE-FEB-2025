import express from "express"
import dotenv from 'dotenv'
import { readFileSync } from "fs"
import path from 'path'
import cors from "cors"
import pool from './db'

interface Book {
    id:number,
    title:string,
    author:string,
    genre:string,
    year:number,
    pages:number
}

//configure the dotenv 
dotenv.config()

//instance of express
const app = express()

//load the variables
const port = process.env.PORT 
console.log(port) //3000


//eneable CORS for all origins  
//app.use(cors())

//enable cors with optiosn (RECOMMENDED)
//To allow only http://localhost:5173:
app.use(cors({
    origin: "http://localhost:5174",
    methods: "GET,POST,PUT,DELETE",
    credentials: true //allows cookies and auth headers
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/books', async (req, res)=>{
try{
    //get books
    const {title,author,genre,year,pages}= req.body
    //compares if book exists
    const checkbook = await pool.query("SELECT * FROM books WHERE title = $1", [title])
    //check if book already exists
    if(checkbook.rows.length > 0){
        res.status(202).json({
            message:"Book already exists"
        })
    return  
    }
    const results = await pool.query("INSERT INTO books (title, author, genre, year, pages) VALUES ($1,  $2, $3, $4, $5) RETURNING * ", [title, author, genre, year, pages])
    res.status(200).json({message:"Book added sucessfully", book:results.rows[0]})
}catch(error){
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

//get all books
app.get('/books', async (req, res)=>{
    try{
        const results = await pool.query("SELECT * FROM books")
        res.status(200).json(results.rows)
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
})

//updating a book
app.patch('/books', async (req, res)=>{
    try{
        const {title,author,genre,year,pages} = req.body
    }catch{
        
    }    
})

//get the current  directory 
const _dirname = path.resolve()

//synchronously read the file
const eventData = readFileSync(
    path.join(_dirname, "src", "db", "data.json"), "utf-8"
)

const books: Book[] = JSON.parse(eventData).library;
// console.log(eventData)
//a simple get request saying hello world  
// Add this route to match what your frontend is requesting

// CREATE - Add a new book

// create server 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

//SOC - separtion of concersn 
