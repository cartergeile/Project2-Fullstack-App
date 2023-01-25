/*-----------------------*/
// SCHEMA AND MODEL     //
/*----------------------*/
const mongoose = require('mongoose')

// destructure the schema and model function
const { Schema, model } = mongoose

const petSchema = new Schema({
  name: String,
  type: String,
  color: String,
  age: Number
})

const Pet = model('Pet', petSchema)

/*-----------------------*/
// EXPORT MODEL         //
/*----------------------*/
module.exports = Pet