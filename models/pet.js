/*-----------------------*/
// SCHEMA AND MODEL     //
/*----------------------*/
const mongoose = require('../utils/connection')

// destructure the schema and model function
const { Schema, model } = mongoose

const petSchema = new Schema({
  name: {
    type: String
  },
  type: {
    type: String
  },
  color: {
    type: String
  },
  age: {
    type: Number
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
}, { timestamps: true })

const Pet = model('Pet', petSchema)

/*-----------------------*/
// EXPORT MODEL         //
/*----------------------*/
module.exports = Pet