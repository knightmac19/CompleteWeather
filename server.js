const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
require('dotenv').config();

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3000;

console.log(process.env)

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', htmlRoutes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));