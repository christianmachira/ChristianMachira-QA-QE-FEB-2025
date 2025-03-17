"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
//configure dotenv
dotenv_1.default.config();
//enable instnace of express
const app = (0, express_1.default)();
//port variables
const port = process.env.PORT;
console.log(port);
//enable CORS
app.use((0, cors_1.default)({
    origin: "http://localhost:5174",
    methods: "GET, POST, PUT, DELETE",
    credentials: true //allows cookies and auth headers
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
