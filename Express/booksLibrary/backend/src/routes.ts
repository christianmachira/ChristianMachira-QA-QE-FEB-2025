import express, {Request, Response} from "express"
import {books, Book} from "./books"

const router = express.Router();

router.get('/', (req: Request, res: Response) =>{
    let filterBooks: Book[] = books;
    
    if(req.query.year) {
        filterBooks = filterBooks.filter(book => book.year === Number(req.query.year));
    }
    if(req.query.genre) {
        filterBooks = filterBooks.filter(book => book.genre === req.query.genre);
    }
    if(req.query.pages) {
        filterBooks = filterBooks.filter(book => book.pages >= Number(req.query.pages));
    }
    res.json(filterBooks);
})

export default router;