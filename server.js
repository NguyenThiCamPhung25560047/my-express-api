const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Express API Dashboard</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
            <style>
                body { font-family: 'Plus Jakarta Sans', sans-serif; }
            </style>
        </head>
        <body class="bg-slate-50 text-slate-800 min-h-screen py-10 px-4 flex items-center justify-center">
            <div class="max-w-2xl w-full bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/60 border border-slate-100 space-y-8">
                
                <!-- Header -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                    <div>
                        <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-200/60 mb-2">
                            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Service Active
                        </div>
                        <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">Express API Portal</h1>
                        <p class="text-slate-500 text-sm mt-0.5">RESTful Web Services & Interactive Playground</p>
                    </div>
                </div>

                <!-- Student Info Card -->
                <div class="bg-indigo-50/60 rounded-2xl p-5 border border-indigo-100/80 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                        <p class="text-xs font-bold text-indigo-500 uppercase tracking-wider">Developer Profile</p>
                        <p class="text-base font-bold text-slate-800 mt-0.5">Nguyen Thi Cam Phung</p>
                    </div>
                    <div class="sm:text-right">
                        <p class="text-xs font-bold text-indigo-500 uppercase tracking-wider">Student ID</p>
                        <p class="text-sm font-semibold text-slate-700 font-mono bg-white px-3 py-1 rounded-lg border border-indigo-100 shadow-sm inline-block mt-0.5">25560047</p>
                    </div>
                </div>

                <!-- Interactive Mini Game Section -->
                <div class="bg-slate-900 text-white rounded-2xl p-6 shadow-lg shadow-slate-900/10 space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <h2 class="text-lg font-bold text-white flex items-center gap-2">
                                🎲 Lucky Draw Simulator
                            </h2>
                            <p class="text-xs text-slate-400">Test the <code class="text-indigo-300">/api/fortune</code> endpoint directly below</p>
                        </div>
                    </div>

                    <div id="game-display" class="bg-slate-800/80 rounded-xl p-4 text-center border border-slate-700/60 min-h-[90px] flex items-center justify-center">
                        <p class="text-slate-400 text-sm italic">Click the button below to draw your prize!</p>
                    </div>

                    <button onclick="playMiniGame()" id="draw-btn" class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-xl transition duration-200 shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 active:scale-[0.99]">
                        <span>Draw Fortune</span> 🚀
                    </button>
                </div>

                <!-- API Endpoints List -->
                <div class="space-y-3">
                    <h2 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Available API Endpoints</h2>
                    <div class="space-y-2">
                        <div class="p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/60 flex items-center justify-between transition group">
                            <div class="flex items-center gap-3">
                                <span class="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md">GET</span>
                                <a href="/api/info" target="_blank" class="text-sm font-mono font-semibold text-slate-700 group-hover:text-indigo-600">/api/info</a>
                            </div>
                            <span class="text-xs text-slate-400">Student Metadata</span>
                        </div>
                        <div class="p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/60 flex items-center justify-between transition group">
                            <div class="flex items-center gap-3">
                                <span class="bg-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-md">GET</span>
                                <a href="/api/fortune" target="_blank" class="text-sm font-mono font-semibold text-slate-700 group-hover:text-indigo-600">/api/fortune</a>
                            </div>
                            <span class="text-xs text-slate-400">Random Game API</span>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Frontend JavaScript for Mini-game -->
            <script>
                async function playMiniGame() {
                    const btn = document.getElementById('draw-btn');
                    const display = document.getElementById('game-display');
                    
                    btn.disabled = true;
                    btn.classList.add('opacity-75');
                    display.innerHTML = '<p class="text-indigo-300 text-sm animate-pulse font-medium">Drawing fortune from server...</p>';

                    try {
                        const response = await fetch('/api/fortune');
                        const result = await response.json();
                        
                        if (result.status === 'success') {
                            const data = result.data;
                            display.innerHTML = \`
                                <div class="space-y-1 animate-fadeIn">
                                    <div class="text-2xl">\${data.emoji}</div>
                                    <p class="text-sm font-bold text-white">\${data.prize}</p>
                                    <p class="text-xs font-mono text-emerald-400">+\${data.points} PTS Awarded</p>
                                </div>
                            \`;
                        }
                    } catch (error) {
                        display.innerHTML = '<p class="text-rose-400 text-sm font-medium">Failed to connect to API server.</p>';
                    } finally {
                        btn.disabled = false;
                        btn.classList.remove('opacity-75');
                    }
                }
            </script>
        </body>
        </html>
    `);
});


app.get('/api/info', (req, res) => {
    res.json({
        status: "success",
        developer: {
            fullName: "Nguyen Thi Cam Phung",
            studentId: "25560047",
            
        },
        application: "Express API Service",
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString()
    });
});


app.get('/api/fortune', (req, res) => {
    const prizes = [
        { emoji: '🏇', prize: 'Grand White Stallion', points: 350 },
        { emoji: '🎟️', prize: 'Lucky Circus Ticket', points: 100 },
        { emoji: '🎰', prize: 'Jackpot Prize Winner', points: 500 },
        { emoji: '🎪', prize: 'Better Luck Next Time', points: 0 }
    ];
    const result = prizes[Math.floor(Math.random() * prizes.length)];
    res.json({
        status: "success",
        data: result
    });
});


app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Endpoint not found on this server."
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});