/*-----------------------*/
// IMPORT DEPENDENCIES  //
/*----------------------*/
const express = require('express')
//const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()
const path = require('path')
const PetRouter = require('./controllers/petControllers')

/*-----------------------*/
// IMPORT MODELS        //
/*----------------------*/
const Pet = require('./models/pet')


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