import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import pool from "../../config/db";
import { UserRequest } from "../../models/usermodel";
import asyncHandler from "../asyncHandler";



//Auth middleware to protect routes 
export const protect = asyncHandler(async (req: UserRequest, res: Response, next: NextFunction) => {
    let token;

    //trying to get token from Authorization Header 
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    //get the token from cookies 
    if (!token && req.cookies?.access_token) {
        token = req.cookies.access_token;
    }

    //if no token found
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        //we have the token but we need to verify it 
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        //verify token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { user_id: number; role_id: number };

        //get the user from database
        const userQuery = await pool.query(
            "SELECT u.user_id, u.name, u.email, u.role_id, ur.role_name FROM users u JOIN USER_ROLES ur ON u.role_id = ur.role_id WHERE u.user_id = $1",
            [decoded.user_id]
        );

        if (userQuery.rows.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }

        //attach the user to the request 
        req.user = userQuery.rows[0];
        next(); //proceed to next thing 

    } catch (error) {
        console.error("JWT Error:", error);
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
});