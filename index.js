const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    const user_id = 'arnav_thakur_01011990';
    const email = 'arnav@srmist.edu.in';
    const roll_number = 'SRM12345';

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: 'Invalid input data'
        });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item) && /^[A-Za-z]$/.test(item));
    const highest_alphabet = alphabets.length > 0 ? [alphabets.sort().reverse()[0]] : [];

    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_alphabet
    });
});

app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
