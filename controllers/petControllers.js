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

// INDEX route -> displays all pets
router.get('/', (req, res) => {
  Pet.find({})
  .then(pets => { res.json({ pets : pets })})
  .catch(err => {
    console.log(err)
    res.status(404).json(err)
  })
})

// CREATE route -> creates a new document in the database
router.post('/', (req, res) => {
  const newPet = req.body
  Pet.create(newPet)
    .then(pet => {
      res.status(201).json({ pet: pet.toObject() })
    })
    .catch(err => {
      console.log(err)
      res.status(404).json(err)
    })
})

// UPDATE(PUT) -> updates a specific pet
router.put('/:id', (req, res) => {
  const id = req.params.id
  const updatedPet = req.body
  Pet.findByIdAndUpdate(id, updatedPet, { new: true })
    .then(pet => {
      console.log('the newly updated pet', pet)
      res.sendStatus(204)
    })
    .catch(err => {
      console.log(err)
      res.status(404).json(err)
    })
})

// DELETE -> delete a specific pet
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Pet.findByIdAndRemove(id)
    .then(() => {
      res.sendStatus(204)
    })
    .catch(err => {
      console.log(err)
      res.status(404).json(err)
    })
})


// SHOW route -> finds and displays single resource
router.get('/:id', (req, res) => {
  const id = req.params.id
  Pet.findById(id)
    .then(pet => {
      res.json({ pet: pet })
    })
    .catch(err => {
      console.log(err)
      res.status(404).json(err)
    })
})


/*-----------------------*/
// EXPORT ROUTER        //
/*----------------------*/
module.exports = router