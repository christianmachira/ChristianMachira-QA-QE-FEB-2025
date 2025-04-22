import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Response } from 'express';

dotenv.config();

export const generateToken = (res: Response, user_id: number, role_id: number) => {
    const jwtSecret = process.env.JWT_SECRET;
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

    if (!jwtSecret || !refreshSecret) {
        throw new Error("JWT_SECRET or REFRESH_TOKEN_SECRET is not defined in the environment variables");
    }

    try {
        const accessToken = jwt.sign({ user_id, role_id }, jwtSecret, { expiresIn: "1d" });
        const refreshToken = jwt.sign({ user_id }, refreshSecret, { expiresIn: "30d" });

        // Set access token cookie
        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, // 15 minutes
        });

        // Set refresh token cookie
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Token generation error:", error);
        throw new Error("Error generating authentication tokens");
    }
};




