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
exports.logoutuser = exports.loginuser = exports.createuser = void 0;
const db_1 = __importDefault(require("../config/db"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
//create user
exports.createuser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const result = yield db_1.default.query("INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *", [name, email, password]);
    res.status(201).json({
        message: "User created successfully",
        user: result.rows[0],
    });
}));
//login user
exports.loginuser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const result = yield db_1.default.query("SELECT * FROM users WHERE email = $1 AND password = $2", [email, password]);
    if (result.rows.length === 0) {
        res.status(401).json({
            message: "Invalid email or password",
        });
        return;
    }
    res.status(200).json({
        message: "User logged in successfully",
        user: result.rows[0],
    });
}));
//logout user
exports.logoutuser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully",
    });
}));
