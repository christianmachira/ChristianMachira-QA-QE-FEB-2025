"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const requestcontroller_1 = require("../controllers/requestcontroller");
const router = (0, express_1.Router)();
router.post('/borrow', requestcontroller_1.borrowBook);
router.get('/borrowed', requestcontroller_1.getBorrowedBooks);
router.delete('/borrowed/:id', requestcontroller_1.returnBorrowedBook);
exports.default = router;
