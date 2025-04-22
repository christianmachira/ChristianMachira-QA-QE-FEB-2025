import express from 'express'
import { getallbooks, deleteBook, updatebooks, createBook, getbookbyid } from '../controllers/bookcontroller'
import { adminGuard, staffGuard } from '../middleware/authMiddlewares/guards'
import { protect } from '../middleware/authMiddlewares/protect';

const router = express.Router()

// Public routes
router.get("/getBook", getallbooks)
router.get("/getBook/:id", getbookbyid)

// Protected routes
router.post("/addBook", protect, staffGuard, createBook)  // Admin or Librarian can add books
router.patch("/editBook/:id", protect, staffGuard, updatebooks)  // Admin or Librarian can edit books
router.delete("/removeBook/:id", protect, adminGuard, deleteBook)  // Only Admin can delete books

export default router