// dependencies
const path = require('path');
const express = require('express');

const mongoose = require('mongoose');
require('dotenv').config();

// require gallery module
const japan = require('./models/japan');
const { response } = require('express');

//create express app
const app = express();

// view engine
app.set('view engine', 'ejs');

// middleware
app.use(express.static(path.join(__dirname, 'public')));


// connect to mongooseDB
mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', function(error){
  console.log(`Connection error: ${error.message}`)
});

db.once('open', function(){
  console.log('Connected to DB')
});

// homepage
app.get('/', function(request, response){
     response.send('this is homepage')
   });

// JSON ENDPOINTS

// RETURNS ARRAY

app.get('/api/v0/japan/:id', function(request,response){
  Japan.find({}, function(error,data){
    if (error) {
      response.send('file does not exist')
    }
    else {
      response.json(data)
    }
  });
});

// RETURNS OBJECTS



// json endpoint for gallery
app.get('/api/v0/gallery', function(request,response){
  response.json(japan);
});

// middleware
app.use(function(req, res) {
  res.status(404);
  res.send('404: File Not Found');
});

// set port preference
const PORT = process.env.PORT || 8080;

// start server
app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});



  // // homepage render
  // app.get('/', function(request, response){
  //   response.render('pages/index.ejs',{title: 'please'})
  // });
  
  
  // // gallery page render
  // app.get('/gallery', function(request, response){
  //   response.render('pages/gallery',{title: 'gallery'})
  // });
  
  // // subscribe page render
  // app.get('/subscribe', function(request, response){
  //   response.render('pages/subscribe',{title: 'subscribe'})
  // });