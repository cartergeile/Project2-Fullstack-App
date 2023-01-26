/*-----------------------*/
// IMPORT DEPENDENCIES  //
/*----------------------*/
const express = require('express')
//const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()
const path = require('path')
const PetRouter = require('./controllers/petControllers')
const UserRouter = require('./controllers/userControllers')
const RatingRouter = require('./controllers/ratingControllers')
const middleware = require('./utils/middleware')


/*---------------------------------*/
// Create our express app object  //
/*--------------------------------*/
const app = express()

/*-----------------------*/
// MIDDLEWARE           //
/*----------------------*/
middleware(app)

/*-----------------------*/
// ROUTES               //
/*----------------------*/
app.get('/', (req, res) => {
  res.send('Server is live ready for requests')
})

// register routes
app.use('/pets', PetRouter)
app.use('/users', UserRouter)
app.use('/ratings', RatingRouter)

/*-----------------------*/
// SERVER LISTENER      //
/*----------------------*/
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of: ${PORT}`))

// END