const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const customer = require('./routes/customer'); // Imports routes for the customer api
const cors = require('cors');

// If env isn't production, read configurations from .env file.
// Else run application by setting environment variables from command line.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Set up mongoose connection
let dev_db_url = 'mongodb://127.0.0.1:27017/Customer';
let mongoDBUrlString = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDBUrlString, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on('error', function (err) {
    if (err) { // couldn't connect
        console.log('MongoDB connection error: ' + mongoDBUrlString);
        process.exit();
    }
});

// Set up express configuration
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
// Set up customer routes with path /api
app.use('/api', customer);

// port = 3001
app.listen(3001, () => {
    console.log('Server is up and running on port number 3001');
});

module.exports = app
