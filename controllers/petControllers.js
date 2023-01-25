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

// build seed route, some starter pets
router.get('/seed', (req, res) => {
  const startPets = [
    { name: 'Sherman', type: 'dog', color: 'white and brown', age: 12 },
    { name: 'Cody', type: 'dog', color: 'white and black', age: 7 },
    { name: 'Boots', type: 'cat', color: 'grey', age: 10 },
    { name: 'Tigger', type: 'cat', color: 'brown', age: 11 },
  ]
  Pet.deleteMany({})
    .then(() => {
      Pet.create(startPets)
        .then(data => {
          res.json(data)
        })
        .catch(err => console.log('the following error occured: \n', err))
    })    
})

// INDEX route -> displays all pets
router.get('/', (req, res) => {
  Pet.find({})
  .then(pets => { res.json({ pets : pets })})
  .catch(err => console.log('the following error occured: \n', err))
})

// CREATE route -> creates a new document in the database
router.post('/', (req, res) => {
  const newPet = req.body
  Pet.create(newPet)
    .then(pet => {
      res.status(201).json({ pet: pet.toObject() })
    })
    .catch(err => console.log(err))
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
    .catch(err => console.log(err))
})

// DELETE -> delete a specific pet
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Pet.findByIdAndRemove(id)
    .then(() => {
      res.sendStatus(204)
    })
    .catch(err => console.log(err))
})


// SHOW route -> finds and displays single resource
router.get('/:id', (req, res) => {
  const id = req.params.id
  Pet.findById(id)
    .then(pet => {
      res.json({ pet: pet })
    })
    .catch(err => console.log(err))
})


/*-----------------------*/
// EXPORT ROUTER        //
/*----------------------*/
module.exports = router