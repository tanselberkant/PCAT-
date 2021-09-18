const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const Photo = require('./models/Photo');

const app = express();

// Connect Db
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// TEMPLATE ENGINE
app.set('view engine', 'ejs'); // We saying to express that we are gonna use ejs for template engine

// MIDDLEWARES
app.use(express.static('public')); // Statik dosyalarımız için publik klasörü olusturmak

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

// ROUTES
app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', {
    photos,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.get('/photos/:id', async (req, res) => {
  // console.log(req.params.id)
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});

// Add photo
app.post('/photos', async (req, res) => {
  // console.log(req.body);
  // await Photo.create(req.body)
  // console.log(req.files.image);

  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadeImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadeImage.name;

  uploadeImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadeImage.name,
    });
    res.redirect('/');
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi..`);
});
