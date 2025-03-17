import { Request, Response, NextFunction } from "express";
import pool from "../db";
import {asyncHandler} from "../middlewares/asynchandler";

//read books controller
export const bookscontroller = asyncHandler(
  async (req: Request, res: Response) => {
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
  }
);
//update/edit books
export const editBooks = asyncHandler(async (req: Request, res: Response) => {
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
export const deleteBook = asyncHandler(async (req: Request, res: Response) => {
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
//create new book
export const updateBook = asyncHandler(async (req: Request, res: Response) => {
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
