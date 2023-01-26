/*-----------------------*/
// IMPORT DEPENDENCIES  //
/*----------------------*/
const express = require('express')
const Pet = require('../models/pet')

/*-----------------------*/
// CREATE ROUTER        //
/*----------------------*/
const router = express.Router()

/*-----------------------*/
// ROUTES               //
/*----------------------*/

// POST -> `/ratings/<petId>`
router.post('/:petId', (req, res) => {
  const petId = req.params.petId
  if (req.session.loggedIn) {
    req.body.author = req.session.userId
    const theRating = req.body
    Pet.findById(petId)
      .then(pet => {
        pet.ratings.push(theRating)
        return pet.save()
      })
      .then(pet => {
        res.status(201).json({ pet: pet })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json(err)       
      })
  } else {
    res.sendStatus(401)
  }
})

// DELETE -> /ratings/delete/<petId>/<ratingId>
router.delete('/delete/:petId/:ratingId', (req, res) => {
  const { petId, ratingId } = req.params
  Pet.findById(petId)
  .then(pet => {
    const theRating = pet.ratings.id(ratingId)
    if (req.session.loggedIn) {
      if (theRating.author == req.session.userId) {
        theRating.remove()
        pet.save()
        res.sendStatus(204)
      } else {
        res.sendStatus(401)
      }
    } else {
      res.sendStatus(401)
    }
  })
  .catch(err => {
    console.log(err)
    res.status(400).json(err) 
  })
})


/*-----------------------*/
// EXPORT ROUTER         //
/*----------------------*/
module.exports = router