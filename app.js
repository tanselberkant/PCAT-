const express = require('express');
const path = require('path');
const ejs = require('ejs');

const app = express();
const port = 3000;

// TEMPLATE ENGINE
app.set('view engine', 'ejs'); // We saying to express that we are gonna use ejs for template engine

// MIDDLEWARES
app.use(express.static('public')); // Statik dosyalarımız için publik klasörü olusturmak

// ROUTES
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi..`);
});
