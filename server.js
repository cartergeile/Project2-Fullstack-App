/*-----------------------*/
// IMPORT DEPENDENCIES  //
/*----------------------*/
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()
const path = require('path')

/*-----------------------*/
// IMPORT MODELS        //
/*----------------------*/
const Pet = require('./models/pet')

/*-----------------------*/
// DATABASE CONNECTION   //
/*----------------------*/
// set up inputs for database connect function
const DATABASE_URL = process.env.DATABASE_URL
// DB config object
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// establish db connection
mongoose.connect(DATABASE_URL, CONFIG)

// tell mongoose what to do with certian events
// what happens when we open, disconnect, error
mongoose.connection
  .on('open', () => console.log('Connected to Mongoose'))
  .on('close', () => console.log('Disconnected from Mongoose'))
  .on('error', (err) => console.log('An error occured: \n', err))

/*---------------------------------*/
// Create our express app object  //
/*--------------------------------*/
const app = express()

/*-----------------------*/
// MIDDLEWARE           //
/*----------------------*/
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'))
app.use(express.json())

/*-----------------------*/
// ROUTES               //
/*----------------------*/
app.get('/', (req, res) => {
  res.send('Server is live ready for requests')
})

// build seed route, some starter pets
app.get('/pets/seed', (req, res) => {
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
app.get('/pets', (req, res) => {
  Pet.find({})
  .then(pets => { res.json({ pets : pets })})
  .catch(err => console.log('the following error occured: \n', err))
})

// CREATE route -> creates a new document in the database
app.post('/pets', (req, res) => {
  const newPet = req.body
  Pet.create(newPet)
    .then(pet => {
      res.status(201).json({ pet: pet.toObject() })
    })
    .catch(err => console.log(err))
})

// UPDATE(PUT) -> updates a specific pet
app.put('/pets/:id', (req, res) => {
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
app.delete('/pets/:id', (req, res) => {
  const id = req.params.id
  Pet.findByIdAndRemove(id)
    .then(() => {
      res.sendStatus(204)
    })
    .catch(err => console.log(err))
})


// SHOW route -> finds and displays single resource
app.get('/pets/:id', (req, res) => {
  const id = req.params.id
  Pet.findById(id)
    .then(pet => {
      res.json({ pet: pet })
    })
    .catch(err => console.log(err))
})



/*-----------------------*/
// SERVER LISTENER      //
/*----------------------*/
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of: ${PORT}`))

// END