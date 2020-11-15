const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// IMPORT SEEDS DATA
const dbSeed = require(`./seeds/japans.js`);

// DEFINE MODEL
const Japan = require(`./models/japan.js`);

// MONGODB CONNECTION
mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', function(error){
  console.log(`Connection Error: ${error.message}`)
});

db.once('open', function() {
  console.log('Connected to DB...');
});

Japan.insertMany(dbSeed, function(error, japan){
  console.log('Data import completed.')
  mongoose.connection.close();
});