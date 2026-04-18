const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Students");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET BY ID
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM Students WHERE Id = ?",
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ message: "Not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, age, password="qwer1234", role="student" } = req.body;
    
    const bcrypt = require("bcrypt");
    const hashed = await bcrypt.hash(password, 10);
    
    const [result] = await pool.query(
      "INSERT INTO Students (FirstName, LastName, Email, Age, Password, Role) VALUES (?, ?, ?, ?, ?, ?)",
      [firstName, lastName, email, age, hashed, role]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error("POST error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const { firstName, lastName, email, age } = req.body;
    const [result] = await pool.query(
      "UPDATE Students SET FirstName=?, LastName=?, Email=?, Age=? WHERE Id=?",
      [firstName, lastName, email, age, req.params.id]
    );
    if (!result.affectedRows) return res.status(404).json({ message: "Not found" });
    res.json({ id: Number(req.params.id), ...req.body });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM Students WHERE Id=?", [req.params.id]);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;