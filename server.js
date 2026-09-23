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
            <title>Express API Portal</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
            <style>
                body { font-family: 'Plus Jakarta Sans', sans-serif; }
            </style>
        </head>
        <body class="bg-slate-50 text-slate-800 min-h-screen py-10 px-4 flex items-center justify-center">
            <div class="max-w-2xl w-full bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/60 border border-slate-100 space-y-8">
                
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                    <div>
                        <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-200/60 mb-2">
                            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Service Active
                        </div>
                        <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight">Express API Portal</h1>
                        <p class="text-slate-500 text-sm mt-0.5">RESTful Web Services & Interactive Playground</p>
                    </div>
                </div>

                <div class="bg-indigo-50/60 rounded-2xl p-5 border border-indigo-100/80 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                        <p class="text-xs font-bold text-indigo-500 uppercase tracking-wider">Student Profile</p>
                        <p class="text-base font-bold text-slate-800 mt-0.5">Nguyen Thi Cam Phung</p>
                    </div>
                    <div class="sm:text-right">
                        <p class="text-xs font-bold text-indigo-500 uppercase tracking-wider">Student ID</p>
                        <p class="text-sm font-semibold text-slate-700 font-mono bg-white px-3 py-1 rounded-lg border border-indigo-100 shadow-sm inline-block mt-0.5">25560047</p>
                    </div>
                </div>

                <div class="bg-slate-900 text-white rounded-2xl p-6 shadow-lg shadow-slate-900/10 space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <h2 class="text-lg font-bold text-white flex items-center gap-2">
                                ✂️ Rock Paper Scissors vs Server
                            </h2>
                            <p class="text-xs text-slate-400">Test the <code class="text-indigo-300">/api/rps?choice=...</code> endpoint directly below</p>
                        </div>
                    </div>

                    <div class="flex gap-2">
                        <button onclick="playRPS('rock')" class="flex-1 bg-slate-800 hover:bg-slate-700 py-3 rounded-xl text-xs font-bold border border-slate-700 transition active:scale-95">🪨 Rock</button>
                        <button onclick="playRPS('paper')" class="flex-1 bg-slate-800 hover:bg-slate-700 py-3 rounded-xl text-xs font-bold border border-slate-700 transition active:scale-95">📄 Paper</button>
                        <button onclick="playRPS('scissors')" class="flex-1 bg-slate-800 hover:bg-slate-700 py-3 rounded-xl text-xs font-bold border border-slate-700 transition active:scale-95">✂️ Scissors</button>
                    </div>

                    <div id="game-display" class="bg-slate-800/80 rounded-xl p-4 text-center border border-slate-700/60 min-h-[70px] flex items-center justify-center">
                        <p class="text-slate-400 text-sm italic">Choose your move to play!</p>
                    </div>
                </div>

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
                                <a href="/api/rps?choice=rock" target="_blank" class="text-sm font-mono font-semibold text-slate-700 group-hover:text-indigo-600">/api/rps</a>
                            </div>
                            <span class="text-xs text-slate-400">Game API</span>
                        </div>
                    </div>
                </div>

            </div>

            <script>
                async function playRPS(userChoice) {
                    const display = document.getElementById('game-display');
                    display.innerHTML = '<p class="text-indigo-300 text-sm animate-pulse font-medium">Server is choosing...</p>';

                    try {
                        const response = await fetch(\`/api/rps?choice=\${userChoice}\`);
                        const result = await response.json();
                        
                        if (result.status === 'success') {
                            const data = result.data;
                            display.innerHTML = \`
                                <div class="text-sm font-medium text-slate-200">
                                    You: <b class="text-white uppercase">\${data.player}</b> vs Server: <b class="text-white uppercase">\${data.server}</b> 
                                    <div class="mt-1 text-base font-extrabold text-indigo-400">\${data.outcome}</div>
                                </div>
                            \`;
                        }
                    } catch (error) {
                        display.innerHTML = '<p class="text-rose-400 text-sm font-medium">Failed to connect to API server.</p>';
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
        student: {
            fullName: "Nguyen Thi Cam Phung",
            studentId: "25560047",
            role: "Student"
        },
        application: "Express API Service",
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString()
    });
});

app.get('/api/rps', (req, res) => {
    const choices = ['rock', 'paper', 'scissors'];
    const player = req.query.choice ? req.query.choice.toLowerCase() : null;
    
    if (!player || !choices.includes(player)) {
        return res.status(400).json({ 
            status: "error", 
            message: "Invalid or missing choice. Parameter 'choice' must be rock, paper, or scissors." 
        });
    }

    const server = choices[Math.floor(Math.random() * choices.length)];
    let outcome = "DRAW";

    if (
        (player === 'rock' && server === 'scissors') ||
        (player === 'paper' && server === 'rock') ||
        (player === 'scissors' && server === 'paper')
    ) {
        outcome = "YOU WIN! 🎉";
    } else if (player !== server) {
        outcome = "SERVER WINS! 🤖";
    }

    res.json({
        status: "success",
        data: { player, server, outcome }
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