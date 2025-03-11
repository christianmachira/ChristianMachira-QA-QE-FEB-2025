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

app.get('/', (req, res) => {

    res.send(`Hello World, Be humble to us`)
})

// CREATE - Add a new book
app.post('/library', async (req, res) => {
    try {
        const { title, author, genre, year, pages } = req.body
        
        // Input validation
        if (!title || !author || !genre || !year || !pages) {
            res.status(400).json({ message: "All fields are required" })
            return
        }
        
        const newBook = await pool.query(
            "INSERT INTO books (title, author, genre, year, pages) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [title, author, genre, year, pages]
        )
        
        res.status(201).json(newBook.rows[0])
    } catch (error) {
        console.error("Error creating book:", error)
        res.status(500).json({ message: "Server error while creating book" })
    }
})

// READ - Get all books with filtering and sorting
app.get('/library', async (req, res) => {
    try {
        const { title, genre, sort, order } = req.query
        
        // Start building the query
        let query = "SELECT * FROM books"
        const queryParams = []
        let whereClause = []
        
        // Add title filter if provided
        if (title) {
            queryParams.push(`%${title}%`)
            whereClause.push(`title ILIKE $${queryParams.length}`)
        }
        
        // Add genre filter if provided
        if (genre) {
            queryParams.push(`%${genre}%`)
            whereClause.push(`genre ILIKE $${queryParams.length}`)
        }
        
        // Add WHERE clause if filters were applied
        if (whereClause.length > 0) {
            query += " WHERE " + whereClause.join(" AND ")
        }
        
        // Add sorting if provided
        // if (sort && ['title', 'author', 'genre', 'year', 'pages'].includes(sort)) {
        //     const direction = order === 'desc' ? 'DESC' : 'ASC'
        //     query += ` ORDER BY ${sort} ${direction}`
        // }
        
        // Execute the query
        const result = await pool.query(query, queryParams)
        res.json(result.rows)
    } catch (error) {
        console.error("Error fetching books:", error)
        res.status(500).json({ message: "Server error while fetching books" })
    }
})

// READ - Get a single book by ID
app.get('/library/:id', async (req, res) => {
    try {
        const bookId = parseInt(req.params.id)
        
        if (isNaN(bookId)) {
            res.status(400).json({ message: "Invalid Book ID" })
            return
        }
        
        const result = await pool.query("SELECT * FROM books WHERE id = $1", [bookId])
        
        if (result.rows.length === 0) {
            res.status(404).json({ message: "Book not found" })
            return
        }
        
        res.json(result.rows[0])
    } catch (error) {
        console.error("Error fetching book:", error)
        res.status(500).json({ message: "Server error while fetching book" })
    }
})

// UPDATE - Update a book
app.put('/library/:id', async (req, res) => {
    try {
        const bookId = parseInt(req.params.id)
        const { title, author, genre, year, pages } = req.body
        
        if (isNaN(bookId)) {
            res.status(400).json({ message: "Invalid Book ID" })
            return
        }
        
        // Check if book exists
        const bookCheck = await pool.query("SELECT * FROM books WHERE id = $1", [bookId])
        if (bookCheck.rows.length === 0) {
            res.status(404).json({ message: "Book not found" })
            return
        }
        
        // Update the book
        const updateQuery = `
            UPDATE books 
            SET title = $1, author = $2, genre = $3, year = $4, pages = $5
            WHERE id = $6
            RETURNING *
        `
        
        const updatedBook = await pool.query(
            updateQuery,
            [title, author, genre, year, pages, bookId]
        )
        
        res.json(updatedBook.rows[0])
    } catch (error) {
        console.error("Error updating book:", error)
        res.status(500).json({ message: "Server error while updating book" })
    }
})

// DELETE - Remove a book
app.delete('/library/:id', async (req, res) => {
    try {
        const bookId = parseInt(req.params.id)
        
        if (isNaN(bookId)) {
            res.status(400).json({ message: "Invalid Book ID" })
            return
        }
        
        // Check if book exists
        const bookCheck = await pool.query("SELECT * FROM books WHERE id = $1", [bookId])
        if (bookCheck.rows.length === 0) {
            res.status(404).json({ message: "Book not found" })
            return
        }
        
        // Delete the book
        await pool.query("DELETE FROM books WHERE id = $1", [bookId])
        
        res.status(200).json({ message: "Book successfully deleted" })
    } catch (error) {
        console.error("Error deleting book:", error)
        res.status(500).json({ message: "Server error while deleting book" })
    }
})

app.get('api/getbooks', async (req, res)=>{
    try{
        const books = await pool.query("SELECT * FROM books")
        res.json(books.rows)
    }catch(error){
        console.error("Error fetching books:", error)
        res.status(500).json({message: "Server error while fetching books"})
    }
})



//sorting API
app.get('/api/library', (req, res) => {
    let filterBooks = books;

    const { title, genre, sort, order } = req.query;

    // Search by title 
    if (title) {
        filterBooks = filterBooks.filter(book => {
            const match = book.title.toLowerCase().includes((title as string).toLowerCase())
            console.log(`Checking book: ${book.title}, Match: ${match}`)
            return match;
    });
        console.log("Received title:", title);
    }

    // Filter by genre (optional)
    if (genre) {
        filterBooks = filterBooks.filter(book => 
            book.genre.toLowerCase() === (genre as string).toLowerCase()
        );
    }

    // Sorting by year (ascending or descending)
    if (sort) {
        filterBooks = filterBooks.sort((a, b) => {
            const fieldA = a[sort as keyof Book];
            const fieldB = b[sort as keyof Book];

            if (typeof fieldA === 'string' && typeof fieldB === 'string') {
                return order === 'desc' 
                    ? fieldB.localeCompare(fieldA) 
                    : fieldA.localeCompare(fieldB);
            }

            if (typeof fieldA === 'number' && typeof fieldB === 'number') {
                return order === 'desc' 
                    ? fieldB - fieldA 
                    : fieldA - fieldB;
            }

            return 0;
        });
    }

    res.json(filterBooks);
});

//fetch book by id
// app.get('/library/:id', (req: Request, res: Response) => {
//     try{
//         const bookid = Number(req.params.id);
//     if (isNaN(bookid)){
//         return res.status(400).json({message: "Invalid Book ID"})
//     }

//     //find the books
//     const book = books.find(book => book.id === bookid);
//     if(!book){
//         return res.status(404).json({message: "Book not found"})   
//     }
//     res.json(book);
// } catch(error){
//     console.error(error);
//     res.status(500).json({message: "Internal Server Error"});
// }
    
// });
// app.get('/all', (req, res) => {

//     res.send(eventData)
// })

// app.get('/all', (req, res) =>{
//     let filterBooks = books;

//     const { title ,year, genre, pages, sort} = req.query;
//     if(title){
//         filterBooks = filterBooks.filter(book => book.title.toLowerCase().includes(title.toString().toLowerCase()))
//     }
//     if(year){
//         filterBooks = filterBooks.filter(book => book.year === Number(year))
//     }
//     if(genre){
//         filterBooks = filterBooks.filter(book => book.genre === genre)
//     }
//     if(pages){
//         filterBooks = filterBooks.filter(book => book.pages >= Number(pages))
//     }
//     if(sort){
//         filterBooks = filterBooks.sort((a,b) => {
//             if(sort === "asc"){
//                 return a.year - b.year
//             }else if(sort === "desc"){
//                 return b.year - a.year
//             }else{
//                 return 0
//             }
//         })
//     }
//     res.json(filterBooks);
// });

// create server 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

//SOC - separtion of concersn 
