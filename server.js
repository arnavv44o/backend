const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// Route: /bfhl | Method: POST
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, error: 'Invalid data format' });
    }

    // Validate data elements
    if (!data.every(item => typeof item === 'string')) {
        return res.status(400).json({ is_success: false, error: 'Invalid data items' });
    }

    let numbers = [];
    let alphabets = [];

    data.forEach(item => {
        if (/^[0-9]+$/.test(item)) {
            numbers.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
        }
    });

    let highest_alphabet = alphabets.length ? [alphabets.sort((a, b) => b.localeCompare(a))[0]] : [];

    // Default filters applied: 'numbers' and 'highestAlphabet'
    let response = {
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers: numbers,
        highest_alphabet: highest_alphabet
    };

    res.json(response);
});

// Route: /bfhl | Method: GET
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
