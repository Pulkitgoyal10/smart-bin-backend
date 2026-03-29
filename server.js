const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Allows your Next.js frontend to read the data
app.use(express.json()); // Allows the server to read ESP32 JSON

// In-memory database for our prototype
let binData = [{
    bin_id: "Bin_001",
    fill_percentage: 0.00,
    battery: 80
}];

// GET route for the Next.js Dashboard
app.get('/data', (req, res) => {
    res.status(200).json(binData);
});

// POST route for the ESP32 Hardware
app.post('/data', (req, res) => {
    const { bin_id, fill_percentage, battery } = req.body;
    
    // Update the database
    binData[0] = {
        bin_id: bin_id || "Bin_001",
        fill_percentage: fill_percentage || 0,
        battery: battery || 80
    };
    
    console.log("✅ New Data Received:", binData[0]);
    res.status(201).send("Data saved successfully");
});

// Railway provides the PORT automatically
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Smart Bin Backend running on port ${PORT}`);
});
