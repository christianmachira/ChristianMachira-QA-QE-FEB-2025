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
exports.deleteuser = exports.updateuser = exports.getuserbyid = exports.getallusers = void 0;
const db_1 = __importDefault(require("../config/db"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
//get all users
exports.getallusers = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query("SELECT * FROM users");
    res.status(200).json({
        message: "Users fetched successfully",
        users: result.rows,
    });
}));
//get user by id
exports.getuserbyid = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield db_1.default.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
        res.status(404).json({
            message: "User not found",
        });
        return;
    }
    res.status(200).json({
        message: "User fetched successfully",
        user: result.rows[0],
    });
}));
//update user
exports.updateuser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const result = yield db_1.default.query("UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *", [name, email, password, id]);
    if (result.rows.length === 0) {
        res.status(404).json({
            message: "User not found",
        });
        return;
    }
    res.status(200).json({
        message: "User updated successfully",
        user: result.rows[0],
    });
}));
//delete user
exports.deleteuser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield db_1.default.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
        res.status(404).json({
            message: "User not found",
        });
        return;
    }
    res.status(200).json({
        message: "User deleted successfully",
        user: result.rows[0],
    });
}));
