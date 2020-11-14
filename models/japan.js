const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    id:           Number,
    title:        String,
    width:        Number,
    Height:       Number,
    description:  String,
    imagePath:    String
  }
);

module.exports = mongoose.model('japan', gallerySchema);