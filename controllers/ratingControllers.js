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
        //res.status(201).json({ pet: pet })
        res.redirect(`/pets/${pet.id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect(`/error?error=Please%20make%20the%20rating%20between%201%20and%2010`)      
      })
  } else {
    //res.sendStatus(401)
    res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20rate%20this%20pet`)
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
        //res.sendStatus(204)
        res.redirect(`/pets/${pet.id}`)
      } else {
        //res.sendStatus(401)
        res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20rating`)
      }
    } else {
      //res.sendStatus(401)
      (`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20rating`)
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/error?error${err}`)
  })
})


/*-----------------------*/
// EXPORT ROUTER         //
/*----------------------*/
module.exports = router