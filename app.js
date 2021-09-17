const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const Photo = require('./models/Photo');

const app = express();
const port = 3000;

// Connect Db
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// TEMPLATE ENGINE
app.set('view engine', 'ejs'); // We saying to express that we are gonna use ejs for template engine

// MIDDLEWARES
app.use(express.static('public')); // Statik dosyalarımız için publik klasörü olusturmak

app.use(express.urlencoded({extended : true}))
app.use(express.json())

// ROUTES
app.get('/',  async (req, res) => {
  const photos = await Photo.find({})
  res.render('index',{
    photos
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

// Add photo
app.post('/photos', async(req,res) => {
  // console.log(req.body);
  await Photo.create(req.body)
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi..`);
});
