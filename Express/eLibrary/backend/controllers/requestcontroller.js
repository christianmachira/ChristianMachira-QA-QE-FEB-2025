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
exports.returnBorrowedBook = exports.getBorrowedBooks = exports.borrowBook = void 0;
const db_1 = __importDefault(require("../config/db"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
// Borrow a book
exports.borrowBook = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book_id, user_id, librarian_id, return_date } = req.body;
        const borrowBookQuery = `INSERT INTO borrowers (book_id, user_id, librarian_id, return_date) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [book_id, user_id, librarian_id, return_date];
        const borrowedBook = yield db_1.default.query(borrowBookQuery, values);
        res.status(200).json({ message: 'Book borrowed successfully', data: borrowedBook.rows[0] });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error });
    }
}));
// get all borrowed books
exports.getBorrowedBooks = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getBorrowedBooksQuery = `SELECT * FROM borrowers`;
        const borrowedBooks = yield db_1.default.query(getBorrowedBooksQuery);
        res.status(200).json({ message: 'All borrowed books', data: borrowedBooks.rows });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error });
    }
}));
//return a borrowed book
exports.returnBorrowedBook = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const returnBorrowedBookQuery = `DELETE FROM borrowers WHERE id = $1`;
        const values = [id];
        yield db_1.default.query(returnBorrowedBookQuery, values);
        res.status(200).json({ message: 'Book returned successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error });
    }
}));
