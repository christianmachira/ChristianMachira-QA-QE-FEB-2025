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
exports.eventOwnerGuard = void 0;
const asyncHandler_1 = __importDefault(require("../asyncHandler"));
const db_1 = __importDefault(require("../../config/db"));
// Ensures user can only modify their own events
exports.eventOwnerGuard = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: eventId } = req.params;
    if (!req.user) {
        res.status(401).json({ message: "Not authorized" });
        return;
    }
    // Check if the user is the owner of the event
    const eventQuery = yield db_1.default.query("SELECT user_id FROM events WHERE id = $1", [eventId]);
    if (eventQuery.rows.length === 0) {
        res.status(404).json({ message: "Event not found" });
        return;
    }
    if (eventQuery.rows[0].user_id !== req.user.id) {
        res.status(403).json({ message: "Not authorized to edit this event" });
        return;
    }
    // Attach event details to request
    req.event = {
        id: eventQuery.rows[0].id,
        user_id: eventQuery.rows[0].user_id,
        title: eventQuery.rows[0].title,
        location: eventQuery.rows[0].location,
        date: eventQuery.rows[0].date,
        price: eventQuery.rows[0].price,
        created_at: eventQuery.rows[0].created_at,
        updated_at: eventQuery.rows[0].updated_at
    };
    next();
}));
