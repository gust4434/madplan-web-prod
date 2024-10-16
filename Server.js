                                                                                  
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

// For compatibility with __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;  // Updated to match the nginx configuration port
const API_URL = 'https://lunch.tosi.dk/api/v1/latest.json';

app.use(cors());

// Serve frontend files directly from the root directory
app.use(express.static(__dirname));

// API Route
app.get('/api/meals', async (req, res) => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching API data:', error);
        res.status(500).json({ error: 'Error fetching meal plan.' });
    }
});

// Fallback for Single Page Applications
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Index.html'));
});

app.listen(PORT, '0.0.0.0', () => {  // Binds server to all network interfaces
    console.log(`Proxy server running at http:/localhost:${PORT}`);
});

