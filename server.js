/*-----------------------*/
// IMPORT DEPENDENCIES  //
/*----------------------*/
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()
const path = require('path')
const PetRouter = require('./controllers/petControllers')

/*-----------------------*/
// IMPORT MODELS        //
/*----------------------*/
const Pet = require('./models/pet')

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

/*---------------------------------*/
// Create our express app object  //
/*--------------------------------*/
const app = express()

/*-----------------------*/
// MIDDLEWARE           //
/*----------------------*/
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'))
app.use(express.json())

/*-----------------------*/
// ROUTES               //
/*----------------------*/
app.get('/', (req, res) => {
  res.send('Server is live ready for requests')
})

// register routes
app.use('/pets', PetRouter)


/*-----------------------*/
// SERVER LISTENER      //
/*----------------------*/
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of: ${PORT}`))

// END