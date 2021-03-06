const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');

const photoController = require('./controllers/photoController');
const pageController = require('./controllers/pageController');

const app = express();

// Connect Db
mongoose.connect('mongodb+srv://tansel:4s4bPtNb97EFlcVm@cluster0.2oiqk.mongodb.net/pcat-db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=> {
  console.log('DB Connected')
}).catch((err) => {
  console.log(err);
});

// TEMPLATE ENGINE
app.set('view engine', 'ejs'); 

// MIDDLEWARES
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// ROUTES
app.get('/', photoController.getAllPhotos); // Get All Photos
app.get('/photos/:id', photoController.getPhoto); // Photo Detail
app.post('/photos', photoController.createPhoto); // Add Photo
app.put('/photos/:id', photoController.updatePhoto); // Update Photo
app.delete('/photos/:id', photoController.deletePhoto); // Delete Photo

app.get('/about', pageController.getAboutPage);          // About Page
app.get('/add', pageController.getAddPage);              // Add Page 
app.get('/photos/edit/:id', pageController.getEditPage);  // Edit Page

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi..`);
});
