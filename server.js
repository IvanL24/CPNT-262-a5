// dependencies
const path = require('path');
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
require('dotenv').config();

// IMPORT MODELS
const Japan = require('./models/japan.js');

//create express app
const app = express();

// view engine
app.set('view engine', 'ejs');

// app.use FOR USING MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));


// CONNECT TO MONGODB
mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', function(error){
  console.log(`Connection error: ${error.message}`)
});

db.once('open', function(){
  console.log('Connected to DB ...')
});

// HOMEPAGE
app.get('/', function(request, response){
     response.send("<h1>WELCOME! Here you can find the endpoints use in this assignment</h1><br> <h2><p>To access the array of object, copy and paste the given the endpoint to the current url : <em>/api/v0/japans</em></p></h2> <br> <h2><p>In order to access the object individually, copy, paste and choose a number to add at the end of the endpoint: <em>/api/v0/japans/[any numbers from 101 - 108 only]</em></p></h2> ")
   });

// JSON ENDPOINTS

// RETURNS ARRAY
app.get('/api/v0/japans', function(request,response){
  Japan.find({}, function(error,data){
    if (error) {
      response.send('file does not exist')
    }
    else {
      response.json(data);
    }
  });
});


// RETURNS OBJECTS INDIVIDUALLY
app.get('/api/v0/japans/:id', function(request,response){
  let japanId = request.params.id;
  Japan.findOne({id: japanId}, function(error,data){
    if (error) {
      response.send('file does not exist')
    }
    else {
      response.json(data);
    }
  });
});


// MIDDLEWARE
app.use(function(req, res) {
  res.status(404);
  res.send('404: File Not Found');
});

// PORT PREFERENCE
const PORT = process.env.PORT || 8080;

// START SERVER
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