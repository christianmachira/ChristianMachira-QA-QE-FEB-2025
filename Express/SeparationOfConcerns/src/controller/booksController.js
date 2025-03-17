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
exports.updateBook = exports.deleteBook = exports.editBooks = exports.bookscontroller = void 0;
const db_1 = __importDefault(require("../db"));
const asynchandler_1 = require("../middlewares/asynchandler");
//read books controller
exports.bookscontroller = (0, asynchandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield db_1.default.query("SELECT * FROM books WHERE id=$1", [id]);
        if (result.rows.length === 0) {
            res.status(404).json({
                message: "event not found",
            });
            return;
        }
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
}));
//update/edit books
exports.editBooks = (0, asynchandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, author, genre, year, pages } = req.body;
    try {
        const result = yield db_1.default.query("SELECT * FROM books WHERE id=$1", [id]);
        if (result.rows.length === 0) {
            res.status(404).json({
                message: "event not found",
            });
            return;
        }
        const updateEvent = yield db_1.default.query("UPDATE books SET  title = $1, author = $2, genre = $3, year = $4, pages =$5 WHERE id=$6 RETURNING *", [title, author, genre, year, pages, id]);
        res.status(200).json({ message: "event updated", books: updateEvent.rows });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
}));
//delete
exports.deleteBook = (0, asynchandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        //before deleting, check if book is available
        const result = yield db_1.default.query("SELECT * FROM books WHERE id=$1", [id]);
        if (result.rows.length === 0) {
            res.status(404).json({
                message: "event not found",
            });
            return;
        }
        yield db_1.default.query("DELETE FROM books WHERE id=$1", [id]);
        res.json({ message: "Book deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting book");
        res.status(500).json({
            message: "Internal server error",
        });
    }
}));
//create new book
exports.updateBook = (0, asynchandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, author, genre, year, pages } = req.body;
    try {
        const result = yield db_1.default.query("SELECT * FROM books WHERE id=$1", [id]);
        if (result.rows.length === 0) {
            res.status(404).json({
                message: "event not found",
            });
            return;
        }
        const updateEvent = yield db_1.default.query("UPDATE books SET  title = $1, author = $2, genre = $3, year = $4, pages =$5 WHERE id=$6 RETURNING *", [title, author, genre, year, pages, id]);
        res.status(200).json({ message: "event updated", books: updateEvent.rows });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
}));
