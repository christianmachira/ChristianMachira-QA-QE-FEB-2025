import express from 'express'
import { bookscontroller, deleteBook, editBooks, updateBook } from '../controller/booksController'

//instance of router
const router = express.Router()

//create routes
//POST,GET,PATCH,DELETE

router.patch("/addBook/:id", updateBook)
router.get("/getBook/:id", bookscontroller)
router.delete("/removeBook/:id", deleteBook)
router.put("/editBook/:id", editBooks)

export default router