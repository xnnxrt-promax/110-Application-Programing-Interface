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
    res.json({
        message: 'Hello from Backend!',
        version: 'ERR VER.',
        head1: '110 Code คืออะไร?',
        des1: 'คือโปรเจคที่จะรวมการเขียนโค้ดของ Overdrive Team Developer ไว้ในที่เดียวโดยจะมีตั่งแต่ สคริป Roblox, บอทต่างๆ, open src website, Roblox Model และอื่นๆ',
        head2: 'โปรเจคนี้ใครเป็นคนพัฒนา?',
        des2: 'จัดทำโดย Az และทีมพัฒนาอย่าง Overdrive Team',
        head3: 'ใช้ภาษาอะไรในการทำโปรเจคนี้?',
        des3: 'ส่วนมากจะเป็น Lua, Jave-Script, Html, Css และอื่นๆ ตามลำดับ',
        head4: 'Database ใช้อะไรในการทำ?',
        des4: 'ถ้าใช้เป็น php ในการทำจะใช้ในส่วนของ MySQL หากใช้ JS ส่วนใหญ่จะใช้ PostgreSQL',
        head5: 'มันปลอดภัยมั้ย?',
        des: 'โค้ดที่เราแจกฟรีจะเป็น open src ส่วนใหญ่โดยเราจะไม่แจกเป็นไฟล์ exe หรือฝังโค้ดดักแน่นอนครับ ถ้าไม่ได้แจกเป็น src แสดงว่าอาจจะจำเป็นต้องใช้ api ของทางเราซึ่งไม่สามารถเปิดเผยได้เพราะเป็นข้อมูลลับหากไม่สบายใจให้เปิด Anti-Virus หรือเช็คไฟล์ก่อนเปิดไฟล์หากยังไม่สามารถทำให้ท่านสบายใจได้ท่านสามารถคิดได้ด้วยตัวเองว่าจะดาวโหลดหรือไม่ (กรุณาใช้สมองไต่ตรอง)'
    });
});

// จัดการเส้นทางอื่น ๆ ด้วย React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
