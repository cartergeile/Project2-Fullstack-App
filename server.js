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
// const app = express()
const app = require('liquid-express-views')(express())

/*-----------------------*/
// MIDDLEWARE           //
/*----------------------*/
middleware(app)

/*-----------------------*/
// ROUTES               //
/*----------------------*/
app.get('/', (req, res) => {
  const {username, loggedIn, userId} = req.session
  res.render('home.liquid', {username, loggedIn, userId})
})

// register routes
app.use('/pets', PetRouter)
app.use('/users', UserRouter)
app.use('/ratings', RatingRouter)

// error page
app.get('/error', (req, res) => {
  const error = req.query.error || 'This page does not exist'
  const {username, loggedIn, UserId} = req.session
  res.render('error.liquid', {error, ...req.session})
})

// catch all
app.all('*', (req, res) => {
  res.redirect('/error')
})
/*-----------------------*/
// SERVER LISTENER      //
/*----------------------*/
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of: ${PORT}`))

// END