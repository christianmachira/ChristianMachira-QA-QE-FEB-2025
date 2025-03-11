"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_1 = require("./books");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    let filterBooks = books_1.books;
    if (req.query.year) {
        filterBooks = filterBooks.filter(book => book.year === Number(req.query.year));
    }
    if (req.query.genre) {
        filterBooks = filterBooks.filter(book => book.genre === req.query.genre);
    }
    if (req.query.pages) {
        filterBooks = filterBooks.filter(book => book.pages >= Number(req.query.pages));
    }
    res.json(filterBooks);
});
exports.default = router;
