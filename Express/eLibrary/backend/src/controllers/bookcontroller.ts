import { RequestHandler } from "express";
import pool from "../config/db";
import asyncHandler from "../middleware/asyncHandler";
import { UserRequest } from "../models/usermodel";

//read all the books
export const getallbooks = asyncHandler(async (req, res) => {
  const result = await pool.query("SELECT * FROM books");
  res.status(200).json({
    message: "Books fetched successfully",
    books: result.rows,
  });
});

//get book by id
export const getbookbyid = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM books WHERE book_id = $1", [id]);
  if (result.rows.length === 0) {
    res.status(404).json({
      message: "Book not found",
    });
    return;
  }
  res.status(200).json({
    message: "Book fetched successfully",
    book: result.rows[0],
  });
});

//update book
export const updatebooks = asyncHandler(async (req: UserRequest, res) => {
  const { id } = req.params;
  const { title, author, genre, year, pages,total_copies,available_copies } = req.body;
  const result = await pool.query("SELECT * FROM books WHERE book_id = $1", [id]);
  if (result.rows.length === 0) {
    res.status(404).json({
      message: "Book not found",
    });
    return;
  }
  const updatebooks = await pool.query(
    "UPDATE books SET title = $1, author = $2, genre = $3, year = $4, pages = $5, created_by = $6, total_copies = $7, available_copies = $8 WHERE book_id = $9 RETURNING *",
    [title, author, genre, year, pages,req.user?.user_id,total_copies,available_copies, id]
  );
  res.status(200).json({
    message: "Book updated successfully",
    book: updatebooks.rows[0],
  });
});

//delete book
export const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM books WHERE book_id = $1 RETURNING *", [id]);
  if (result.rows.length === 0) {
    res.status(404).json({
      message: "Book not found",
    });
    return;
  }
  res.status(200).json({
    message: "Book deleted successfully",
    book: result.rows[0],
  });
});

//create new book
export const createBook = asyncHandler(async (req: UserRequest, res) => {
  const { title, author, genre, year, pages,total_copies,available_copies } = req.body;
  const result = await pool.query(
    "INSERT INTO books (title, author, genre, year, pages, created_by,total_copies, available_copies) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
    [title, author, genre, year, pages,req.user?.user_id,total_copies,available_copies ]
  );
  res.status(201).json({
    message: "Book created successfully",
    book: result.rows[0],
  });
  console.log(result.rows[0])
});