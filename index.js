const express = require('express');
const { Client } = require('saweria');
const app = express();
const port = process.env.PORT || 3000;

const client = new Client();
let donationList = []; // Menyimpan 50 donasi terakhir

// Masukkan Stream Key Saweria kamu di sini (Bisa didapat di dashboard Saweria -> Overlay)
client.setStreamKey("eb68e42b80c685a01aebca2f731018f0");

client.on('donations', (donations) => {
    console.log("Donasi masuk!");
    // Gabungkan donasi baru ke list lama, ambil 50 teratas
    donationList = [...donations, ...donationList].slice(0, 50);
});

// Endpoint untuk dibaca oleh Roblox
app.get('/donasi', (req, res) => {
    res.json(donationList);
});

app.listen(port, () => {
    console.log(`Server jalan di port ${port}`);
});