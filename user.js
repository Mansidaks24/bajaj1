const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Input Validation Middleware
const validateInput = (req, res, next) => {
    if (!req.body.data || !Array.isArray(req.body.data)) {
        return res.status(400).json({
            is_success: false,
            error: "Invalid Input",
        });
    }
    next();
};

// POST API
app.post("/bfhl", validateInput, (req, res) => {
    try {
        const { data } = req.body;

        // Separate numbers and alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));

        // Find highest alphabet (case-insensitive)
        const highest_alphabet = alphabets.length > 0
            ? [alphabets.reduce((max, curr) => (curr.toLowerCase() > max.toLowerCase() ? curr : max))]
            : [];

        // Response
        const response = {
            is_success: true,
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123",
            numbers,  // Fixed typo (was "number")
            alphabets,
            highest_alphabet,
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({
            is_success: false,
            error: "Internal Server Error",
        });
    }
});

// GET API
app.get("/bfhl", (req, res) => {
    res.json({ operation_code: 1 });
});

// Start Server
const PORT = process.env.PORT || 10000; // Use Render's assigned port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
