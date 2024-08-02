const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// Route: /bfhl | Method: POST
app.post('/bfhl', (req, res) => {
    const { data, filters } = req.body;
    
    if (!Array.isArray(data) || !Array.isArray(filters)) {
        return res.status(400).json({ is_success: false, error: 'Invalid data or filters format' });
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

    let response = {
        is_success: true,
        user_id: "arnav_thakur",
        email: "as0762@srmist.edu.in",
        roll_number: "RA2111003010371"
    };

    if (filters.includes('numbers')) {
        response.numbers = numbers;
    }
    
    if (filters.includes('highestAlphabet')) {
        response.highest_alphabet = highest_alphabet;
    }

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
