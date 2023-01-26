/*----------------------------------*/
// SCHEMA FOR RATING SUBDOCUMENT    //
/*---------------------------------*/
const mongoose = require('../utils/connection')

const { Schema } = mongoose

const ratingSchema = new Schema({
  rating: {
    type: Number,
    required: true,
    minimum: 0,
    maximum: 10
  }, 
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

/*----------------------------------*/
// EXPORT SCHEMA                   //
/*---------------------------------*/
module.exports = ratingSchema