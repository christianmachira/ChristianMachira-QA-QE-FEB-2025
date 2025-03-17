import { RequestHandler } from "express";
import pool from "../config/db";
import asyncHandler from "../middleware/asyncHandler";

//create user
export const createuser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const result = await pool.query(
    "INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *",
    [name, email, password]
  );
  res.status(201).json({
    message: "User created successfully",
    user: result.rows[0],
  });
});

//login user
export const loginuser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1 AND password = $2",
    [email, password]
  );
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
});

//logout user
export const logoutuser = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
});
