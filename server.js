const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5173;

// สร้างรายการ API Keys ที่ได้รับอนุญาต
const validApiKeys = ['lkaJLDSJjajdjlaksjdhadaJHK2W@)Ilkajda']; // ใส่คีย์ที่อนุญาต

// ตั้งค่า CORS
app.use(cors({
    origin: 'https://110.ovdc.xyz', // อนุญาตเฉพาะเว็บนี้
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // อนุญาตเฉพาะ method ที่กำหนด
    allowedHeaders: ['Content-Type', 'x-api-key'], // อนุญาตเฉพาะ headers ที่กำหนด
    credentials: true // ถ้าต้องการส่ง cookie หรือ authentication
}));

app.use(express.json());

// Middleware สำหรับป้องกัน Postman, Curl และคำขอที่ไม่ได้รับอนุญาต
app.use((req, res, next) => {
    const userAgent = req.headers['user-agent'] || '';
    const referer = req.headers['referer'] || '';

    // ตรวจสอบ User-Agent: บล็อก Postman, Curl หรือเครื่องมือที่ไม่ใช่ browser-based
    if (/PostmanRuntime|curl|wget|python|node/.test(userAgent)) {
        return res.status(403).json({ error: 'Access denied: Invalid User-Agent' });
    }

    // ตรวจสอบ Referer: อนุญาตเฉพาะคำขอที่มาจากเว็บไซต์ที่กำหนด
    if (referer && !referer.startsWith('https://110.ovdc.xyz')) {
        return res.status(403).json({ error: 'Access denied: Invalid Referer' });
    }

    next();
});

// Middleware ตรวจสอบ API Key
app.use('/api', (req, res, next) => {
    const apiKey = req.headers['x-api-key']; // ดึงค่า API Key จาก header
    const clientIp = req.headers['x-forwarded-for'] || req.ip; // ดึง IP ต้นทาง
    console.log(`Request จาก IP: ${clientIp}`); // Log IP ต้นทาง
    
    if (!apiKey || !validApiKeys.includes(apiKey)) {
        return res.status(403).json({ error: 'Unauthorized access' });
    }
    next(); // อนุญาตให้ผ่านไปยัง endpoint ถ้าคีย์ถูกต้อง
});

// Middleware ป้องกันการเข้าถึงหน้าเว็บตรงๆ
app.use((req, res, next) => {
    const userAgent = req.headers['user-agent'] || '';
    const isBrowser = /Mozilla|Chrome|Safari|Edge|Firefox/.test(userAgent);

    if (isBrowser && req.originalUrl === '/') {
        return res.status(403).send('Direct access to this page is not allowed.');
    }
    next();
});

// เสิร์ฟไฟล์ React build
app.use(express.static(path.join(__dirname, 'frontend/build')));

// API Endpoint
app.get('/api', (req, res) => {
    res.json({
        message: '',
        version: '2.3.9',
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
