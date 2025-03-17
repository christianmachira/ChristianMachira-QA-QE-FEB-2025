import express from 'express'
import { getallbooks, deleteBook, updatebooks, createBook } from '../controllers/bookcontroller'

//instance of router
const router = express.Router()

//create routes
//POST,GET,PATCH,DELETE

router.patch("/addBook/:id", updatebooks)
router.get("/getBook/:id", getallbooks)
router.delete("/removeBook/:id", deleteBook)
router.put("/editBook/:id", createBook)

export default router