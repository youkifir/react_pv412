const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "+@er7{55*,.o^l&5v7,<?urz1v_+n3z{cv5?+,9z"; // краще в .env

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password, age, role } = req.body;

        const [existing] = await pool.query(
            "SELECT * FROM Students WHERE email = ?", [email]
        );
        if (existing.length)
            return res.status(400).json({ message: "Email вже існує" });

        const hashed = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            "INSERT INTO Students (firstName, lastName, email, password, age, role) VALUES (?, ?, ?, ?, ?, ?)",
            [firstName, lastName, email, hashed, age, role]
        );

        const user = { id: result.insertId, firstName, lastName, email, age, role };
        const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ user, token });
    } catch (err) {
        console.error("REGISTER error:", err.message);
        res.status(500).json({ message: err.message });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const [rows] = await pool.query(
            "SELECT * FROM Students WHERE email = ?", [email]
        );
        if (!rows.length)
            return res.status(404).json({ message: "Користувача не знайдено" });

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(401).json({ message: "Невірний пароль" });

        const token = jwt.sign(
            { id: user.id, firstName: user.firstName, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role },
            token
        });
    } catch (err) {
        console.error("LOGIN error:", err.message);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;