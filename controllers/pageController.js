const Photo = require('../models/Photo');

// About Page
exports.getAboutPage = (req, res) => {
  res.render('about');
};

// Add Page
exports.getAddPage = (req, res) => {
  res.render('add');
};

// Photo Edit Page
exports.getEditPage = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
};
