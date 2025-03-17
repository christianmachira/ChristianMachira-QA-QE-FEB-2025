import { RequestHandler } from "express";
import pool from "../config/db";
import asyncHandler from "../middleware/asyncHandler";

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
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
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
    "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
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
  const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
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