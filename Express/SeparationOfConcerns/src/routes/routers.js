"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booksController_1 = require("../controller/booksController");
//instance of router
const router = express_1.default.Router();
//create routes
//POST,GET,PATCH,DELETE
router.post("/", booksController_1.updateBook);
router.get("/", booksController_1.bookscontroller);
router.patch("/");
router.delete("/", booksController_1.deleteBook);
router.put("/", booksController_1.editBooks);
exports.default = router;
