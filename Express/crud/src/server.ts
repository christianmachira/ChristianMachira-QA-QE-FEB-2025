import express from "express";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import path from "path";
import cors from "cors";
import pool from "./db";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  pages: number;
}

//configure the dotenv
dotenv.config();

//instance of express
const app = express();

//load the variables
const port = process.env.PORT;
console.log(port); //3000

//enable cors with optiosn (RECOMMENDED)
//To allow only http://localhost:5173:
app.use(
  cors({
    origin: "http://localhost:5174",
    methods: "GET,POST,PUT,DELETE",
    credentials: true, //allows cookies and auth headers
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/books", async (req, res) => {
  try {
    //get books
    const { title, author, genre, year, pages } = req.body;
    //compares if book exists
    const checkbook = await pool.query("SELECT * FROM books WHERE title = $1", [
      title,
    ]);
    //check if book already exists
    if (checkbook.rows.length > 0) {
      res.status(202).json({
        message: "Book already exists",
      });
      return;
    }
    const results = await pool.query(
      "INSERT INTO books (title, author, genre, year, pages) VALUES ($1,  $2, $3, $4, $5) RETURNING * ",
      [title, author, genre, year, pages]
    );
    res
      .status(200)
      .json({ message: "Book added sucessfully", book: results.rows[0] });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

//get all books
app.get("/books", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM books");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
//single search event
app.get("/books/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM books WHERE id=$1", [id]);
    if (result.rows.length === 0) {
      res.status(404).json({
        message: "event not found",
      });
      return;
    }
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

//update single event
app.put("/books/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, year, pages } = req.body;

  try {
    const result = await pool.query("SELECT * FROM books WHERE id=$1", [id]);
    if (result.rows.length === 0) {
      res.status(404).json({
        message: "event not found",
      });
      return;
    }

    const updateEvent = await pool.query(
      "UPDATE books SET  title = $1, author = $2, genre = $3, year = $4, pages =$5 WHERE id=$6 RETURNING *",
      [title, author, genre, year, pages, id]
    );
    res.status(200).json({ message: "event updated", books: updateEvent.rows });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

//delete
app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;
  try {
    //before deleting, check if book is available
    const result = await pool.query("SELECT * FROM books WHERE id=$1", [id]);
    if (result.rows.length === 0) {
      res.status(404).json({
        message: "event not found",
      });
      return;
    }
    await pool.query("DELETE FROM books WHERE id=$1", [id]);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book");
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
//patch
app.patch("/books/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, year, pages } = req.body;

  try {
    const result = await pool.query("SELECT * FROM books WHERE id=$1", [id]);
    if (result.rows.length === 0) {
      res.status(404).json({
        message: "event not found",
      });
      return;
    }

    const updateEvent = await pool.query(
      "UPDATE books SET  title = $1, author = $2, genre = $3, year = $4, pages =$5 WHERE id=$6 RETURNING *",
      [title, author, genre, year, pages, id]
    );
    res.status(200).json({ message: "event updated", books: updateEvent.rows });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
//get the current  directory
const _dirname = path.resolve();

//synchronously read the file
const eventData = readFileSync(
  path.join(_dirname, "src", "db", "data.json"),
  "utf-8"
);

const books: Book[] = JSON.parse(eventData).library;

// create server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

//SOC - separtion of concersn. separating everything to run on its own(routes, controllers)

