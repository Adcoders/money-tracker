const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Transaction = require('./models/transaction');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/moneytracker', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.get('/transactions', async (req, res) => {
    const transactions = await Transaction.find();
    res.json(transactions);
});

app.post('/add-transaction', async (req, res) => {
    const { description, amount, date } = req.body;
    const transaction = new Transaction({ description, amount, date });
    await transaction.save();
    res.json(transaction);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
