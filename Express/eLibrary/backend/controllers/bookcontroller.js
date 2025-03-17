"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBook = exports.deleteBook = exports.updatebooks = exports.getbookbyid = exports.getallbooks = void 0;
const db_1 = __importDefault(require("../config/db"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
//read all the books
exports.getallbooks = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("SELECT * FROM books");
    res.status(200).json({
        message: "Books fetched successfully",
        books: result.rows,
    });
}));
//get book by id
exports.getbookbyid = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield db_1.default.query("SELECT * FROM books WHERE id = $1", [id]);
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
}));
//update book
exports.updatebooks = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, author, genre, year, pages } = req.body;
    const result = yield db_1.default.query("SELECT * FROM books WHERE id = $1", [id]);
    if (result.rows.length === 0) {
        res.status(404).json({
            message: "Book not found",
        });
        return;
    }
    const updatebooks = yield db_1.default.query("UPDATE books SET title = $1, author = $2, genre = $3, year = $4, pages = $5 WHERE id = $6 RETURNING *", [title, author, genre, year, pages, id]);
    res.status(200).json({
        message: "Book updated successfully",
        book: updatebooks.rows[0],
    });
}));
//delete book
exports.deleteBook = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield db_1.default.query("DELETE FROM books WHERE id = $1 RETURNING *", [id]);
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
}));
//create new book
exports.createBook = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, genre, year, pages } = req.body;
    const result = yield db_1.default.query("INSERT INTO books (title, author, genre, year, pages) VALUES ($1, $2, $3, $4, $5) RETURNING *", [title, author, genre, year, pages]);
    res.status(201).json({
        message: "Book created successfully",
        book: result.rows[0],
    });
}));
