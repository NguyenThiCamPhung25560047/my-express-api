const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// 1. Landing Page HTML đẹp mắt cho Trang chủ
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>My Express API Dashboard</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-slate-900 text-white min-h-screen flex items-center justify-center p-4">
            <div class="max-w-lg w-full bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-2xl text-center space-y-4">
                <div class="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/20">
                    🟢 API Status: ONLINE
                </div>
                <h1 class="text-3xl font-black text-indigo-400">Express API Service</h1>
                <p class="text-slate-400 text-sm">Hệ thống Backend RESTful API</p>
                
                <div class="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 text-xs text-left space-y-1">
                    <p><span class="text-slate-400 font-semibold">Sinh viên:</span> Nguyen Thi Cam Phung</p>
                    <p><span class="text-slate-400 font-semibold">MSSV:</span> 25560047</p>
                </div>

                <div class="text-left space-y-2">
                    <h2 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Danh sách API Endpoints:</h2>
                    <ul class="text-xs space-y-2 font-mono">
                        <li class="bg-slate-900 p-2 rounded border border-slate-700/50 flex justify-between items-center">
                            <span class="text-emerald-400 font-bold">GET</span>
                            <a href="/api/info" class="text-indigo-300 hover:underline">/api/info</a>
                        </li>
                        <li class="bg-slate-900 p-2 rounded border border-slate-700/50 flex justify-between items-center">
                            <span class="text-amber-400 font-bold">GET</span>
                            <a href="/api/fortune" class="text-indigo-300 hover:underline">/api/fortune</a>
                        </li>
                    </ul>
                </div>
            </div>
        </body>
        </html>
    `);
});

// 2. Route thông tin sinh viên
app.get('/api/info', (req, res) => {
    res.json({
        status: "success",
        student: "Nguyen Thi Cam Phung",
        id: "25560047",
        course: "CSBU109 - Web Development",
        timestamp: new Date().toISOString()
    });
});

// 3. Route Mini-Game Xổ số / May mắn ngẫu nhiên
app.get('/api/fortune', (req, res) => {
    const prizes = [
        { emoji: '🏇', text: 'Bạch mã hoàng tử (+350 PTS)', points: 350 },
        { emoji: '🎟️', text: 'Vé xem xiếc may mắn (+100 PTS)', points: 100 },
        { emoji: '🎰', text: 'Giải độc đắc Jackpot (+500 PTS)', points: 500 },
        { emoji: '🎪', text: 'Chúc bạn may mắn lần sau (0 PTS)', points: 0 }
    ];
    const result = prizes[Math.floor(Math.random() * prizes.length)];
    res.json({
        status: "success",
        data: result
    });
});

// 4. Handle lỗi 404 (Route không tồn tại)
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Endpoint không tồn tại trên hệ thống!"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});