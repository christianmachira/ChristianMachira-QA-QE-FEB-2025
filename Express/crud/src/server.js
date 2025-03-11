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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
//configure the dotenv 
dotenv_1.default.config();
//instance of express
const app = (0, express_1.default)();
//load the variables
const port = process.env.PORT;
console.log(port); //3000
//eneable CORS for all origins  
//app.use(cors())
//enable cors with optiosn (RECOMMENDED)
//To allow only http://localhost:5173:
app.use((0, cors_1.default)({
    origin: "http://localhost:5174",
    methods: "GET,POST,PUT,DELETE",
    credentials: true //allows cookies and auth headers
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.post('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get books
        const { title, author, genre, year, pages } = req.body;
        //compares if book exists
        const checkbook = yield db_1.default.query("SELECT * FROM books WHERE title = $1", [title]);
        //check if book already exists
        if (checkbook.rows.length > 0) {
            res.status(202).json({
                message: "Book already exists"
            });
            return;
        }
        const results = yield db_1.default.query("INSERT INTO books (title, author, genre, year, pages) VALUES ($1,  $2, $3, $4, $5) RETURNING * ", [title, author, genre, year, pages]);
        res.status(200).json({ message: "Book added sucessfully", book: results.rows[0] });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}));
//get all books
app.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield db_1.default.query("SELECT * FROM books");
        res.status(200).json(results.rows);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
//get the current  directory 
const _dirname = path_1.default.resolve();
//synchronously read the file
const eventData = (0, fs_1.readFileSync)(path_1.default.join(_dirname, "src", "db", "data.json"), "utf-8");
const books = JSON.parse(eventData).library;
// console.log(eventData)
//a simple get request saying hello world  
// Add this route to match what your frontend is requesting
// CREATE - Add a new book
// create server 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
//SOC - separtion of concersn 
