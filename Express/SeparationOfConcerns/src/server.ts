import express from "express";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import path from "path";
import cors from "cors";
import pool from "./db";
import {bookscontroller} from "./controller/booksController"
import bookRouter from "./routes/routers";
import pg from "pg"

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

//get the current  directory
const _dirname = path.resolve();

//synchronously read the file
const eventData = readFileSync(
  path.join(_dirname, "src", "db", "data.json"),
  "utf-8"
);

const books: Book[] = JSON.parse(eventData).library;

//create routes
app.use("/books", bookRouter)

// create server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

//SOC - separtion of concersn. separating everything to run on its own(routes, controllers)

