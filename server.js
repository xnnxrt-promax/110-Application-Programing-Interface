const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5173;

app.use(cors());
app.use(express.json());

// เสิร์ฟไฟล์ React build
app.use(express.static(path.join(__dirname, 'frontend/build')));

// API Endpoint
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from Backend!' },
             { version: 'ERROR VER.' });
});

// จัดการเส้นทางอื่น ๆ ด้วย React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
