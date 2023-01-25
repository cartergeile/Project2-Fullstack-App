/*-----------------------*/
// IMPORT DEPENDENCIES  //
/*----------------------*/
const express = require('express')
const morgan = require('morgan')

/*-----------------------*/
// MIDDLEWARE FUNCTION  //
/*----------------------*/
const middleware = (app) => {
  app.use(morgan('tiny'))
  app.use(express.urlencoded({ extended: true}))
  app.use(express.static('public'))
  app.use(express.json())
}

/*-----------------------*/
// EXPORT FUNCTION      //
/*----------------------*/
module.exports = middleware