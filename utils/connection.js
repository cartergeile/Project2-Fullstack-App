/*-----------------------*/
// IMPORT DEPENDENCIES  //
/*----------------------*/
require('dotenv').config()
const mongoose = require('mongoose')

/*-----------------------*/
// DATABASE CONNECTION   //
/*----------------------*/
// set up inputs for database connect function
const DATABASE_URL = process.env.DATABASE_URL
// DB config object
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// establish db connection
mongoose.connect(DATABASE_URL, CONFIG)

// tell mongoose what to do with certian events
// what happens when we open, disconnect, error
mongoose.connection
  .on('open', () => console.log('Connected to Mongoose'))
  .on('close', () => console.log('Disconnected from Mongoose'))
  .on('error', (err) => console.log('An error occured: \n', err))

/*-----------------------*/
// EXPORT CONNECTION    //
/*----------------------*/
module.exports = mongoose