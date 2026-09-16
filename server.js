const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoint
app.get('/', (req, res) => {
    res.json({
        message: "Hello World! RESTful API is working.",
        student: "Nguyen Thi Cam Phung",
        studentId: "25560047",
        status: "Success"
    });
});

// Endpoint check API
app.get('/api/hello', (req, res) => {
    res.json({
        message: "Hello World from Express API!"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});