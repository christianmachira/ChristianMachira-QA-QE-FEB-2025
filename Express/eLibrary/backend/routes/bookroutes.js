"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookcontroller_1 = require("../controllers/bookcontroller");
//instance of router
const router = express_1.default.Router();
//create routes
//POST,GET,PATCH,DELETE
router.patch("/addBook/:id", bookcontroller_1.updatebooks);
router.get("/getBook/:id", bookcontroller_1.getallbooks);
router.delete("/removeBook/:id", bookcontroller_1.deleteBook);
router.put("/editBook/:id", bookcontroller_1.createBook);
exports.default = router;
