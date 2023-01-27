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
  const { username, loggedIn, userId} = req.session
  Pet.find({})
  .populate('owner', '-password')
  .populate('ratings.author', '-password')
  .then(pets => { 
    res.render('pets/index', { pets, username, loggedIn, userId })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/error?error=${err}`)
  })
})

// CREATE route -> creates a new document in the database
router.post('/', (req, res) => {
  req.body.owner = req.session.userId
  const newPet = req.body
  Pet.create(newPet)
    .then(pet => {
      res.status(201).json({ pet: pet.toObject() })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/error?error=${err}`)
    })
})

// GET -> INDEX/MINE
router.get('/mine', (req, res) => {
  Pet.find({ owner: req.session.userId })
    .populate('owner', 'username')
    .populate('ratings.author', '-password')
    .then(pets => {
      res.status(200).json({ pets: pets })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/error?error=${err}`)
    })
})

// UPDATE(PUT) -> updates a specific pet
router.put('/:id', (req, res) => {
  const id = req.params.id
  Pet.findById(id)
    .then(pet => {
      if (pet.owner == req.session.userId) {
        res.sendStatus(204)
        return pet.updateOne(req.body)
      } else {
        res.sendStatus(401)
      }
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/error?error=${err}`)
    })
})

// DELETE -> delete a specific pet
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Pet.findById(id)
    .then(pet => {
      if (pet.owner == req.session.userId) {
        res.sendStatus(204)
        return pet.deleteOne()
      } else {
        res.sendStatus(401)
      }
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/error?error=${err}`)
    })
})


// SHOW route -> finds and displays single resource
router.get('/:id', (req, res) => {
  const id = req.params.id
  Pet.findById(id)
  .populate('ratings.author', 'username')
    .then(pet => {
      res.json({ pet: pet })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/error?error=${err}`)
    })
})


/*-----------------------*/
// EXPORT ROUTER        //
/*----------------------*/
module.exports = router