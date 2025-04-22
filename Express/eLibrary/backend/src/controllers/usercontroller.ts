import { NextFunction, RequestHandler } from "express";
import pool from "../config/db";
import asyncHandler from "../middleware/asyncHandler";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token";
import { Request, Response } from "express";

//create user
export const createuser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, role_name } = req.body;

  try {
      // Check if the user already exists
      const userExists = await pool.query("SELECT user_id FROM users WHERE email = $1", [email]);

      if (userExists.rows.length > 0) {
          return res.status(400).json({ message: "User already exists" });
      }

      // Get role_id from user_roles table using role_name
      const roleQuery = await pool.query("SELECT role_id FROM USER_ROLES WHERE role_name = $1", [role_name]);

      if (roleQuery.rows.length === 0) {
          return res.status(400).json({ message: "Invalid role name" });
      }

      const role_id = roleQuery.rows[0].role_id;

      // Hash the password before storing it
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insert new user into users table
      const newUser = await pool.query(
          "INSERT INTO users (name, email, password, role_id) VALUES ($1, $2, $3, $4) RETURNING user_id, name, email, role_id",
          [name, email, hashedPassword, role_id]
      );

      // Generate JWT token for user access
     const token =  generateToken(res, newUser.rows[0].user_id, newUser.rows[0].role_id);
      console.log(token)
      res.status(201).json({
          message: "User registered successfully",
          user: newUser.rows[0],
      });

  } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});

//get all users
export const getallusers = asyncHandler(async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.status(200).json({
    message: "Users fetched successfully",
    users: result.rows,
  });
});

//get user by id
export const getuserbyid = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
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
});

//update user
export const updateuser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const result = await pool.query(
    "UPDATE users SET name = $1, email = $2, password = $3 WHERE user_id = $4 RETURNING *",
    [name, email, password, id]
  );
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
});

//delete user
export const deleteuser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM users WHERE user_id = $1 RETURNING *", [id]);
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
});