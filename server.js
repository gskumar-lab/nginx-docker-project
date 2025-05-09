const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();
const port = process.env.PORT || 3000;

const appName = process.env.APP_NAME || 'DefaultApp';

// Security middleware
app.use(helmet());

// Logging
app.use(morgan('combined'));

// Static files with cache control
app.use('/images', express.static(path.join(__dirname, 'images'), {
    maxAge: '30d'
}));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Main route
app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    console.log(`Request served by ${appName}`);
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`${appName} is listening on port ${port}`);
});