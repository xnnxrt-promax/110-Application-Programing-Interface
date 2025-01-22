const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5173;

// ตั้งค่า CORS เพื่ออนุญาตเฉพาะ https://110.ovdc.xyz
const corsOptions = {
    origin: 'https://110.ovdc.xyz', // อนุญาตเฉพาะโดเมนนี้
    methods: ['GET', 'POST'], // อนุญาตเฉพาะวิธีการเหล่านี้
    allowedHeaders: ['Content-Type', 'Authorization'], // อนุญาตเฉพาะ header เหล่านี้
};
app.use(cors(corsOptions));

app.use(express.json());

// เสิร์ฟไฟล์ React build
app.use(express.static(path.join(__dirname, 'frontend/build')));

// API Endpoint
app.get('/api', (req, res) => {
    res.json({
        message: '',
        version: '2.3.8',
        festival: 'China New Year',
        az_discord_profile: 'https://discord.com/users/1119676900462313572',
        doc: 'https://code-101-or-documents.gitbook.io/',
        aungpao_link: 'https://pornhub.org',
        Google_clientId: '298579406026-9utgproshifbaeqpc460p49e522tj6f2.apps.googleusercontent.com',
        message_login: 'สวัสดี ท่านสามารถกด Login ด้านล่างเพื่อเข้าสู่ระบบได้เลยครับ'
    });    
});

// จัดการเส้นทางอื่น ๆ ด้วย React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
