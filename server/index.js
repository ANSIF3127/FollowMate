const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// API endpoints can be added here if needed in the future
app.get('/api/status', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// Using regex for better compatibility with newer Express versions if needed
app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
