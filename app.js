const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middlewares
app.use(express.static('public')); // Statik dosyalarımız için publik klasörü olusturmak

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'temp/index.html'));
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi..`);
});
