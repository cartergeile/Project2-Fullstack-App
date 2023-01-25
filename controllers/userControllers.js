/*-----------------------*/
// IMPORT DEPENDENCIES  //
/*----------------------*/
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

/*-----------------------*/
// CREATE ROUTER        //
/*----------------------*/
const router = express.Router()

/*-----------------------*/
// ROUTES               //
/*----------------------*/
// POST -> /users/signup
router.post('/signup', async (req, res) => {
  const newUser = req.body
  //console.log(req.body)
  newUser.password = await bcrypt.hash(
    newUser.password,
    await bcrypt.genSalt(10)
  )
  User.create(newUser)
    .then(user => {
      //console.log(user)
      res.status(201).json({ username: user.username })
    })
    .catch(err => {
      console.log(err)
      res.json(err)
    })
})

// POST -> /users/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  User.findOne({ username })
    .then(async (user) => {
      if (user) {
        const result = await bcrypt.compare(password, user.password)
          if (result) {
            req.session.username = username
            req.session.loggedIn = true
            req.session.userId = user.id
            //console.log(req.session)
            res.status(201).json({ username: user.username })
          } else {
            res.json({ error: 'username or password is incorrect' })
          }
      } else {
        res.json({ error: 'user does not exist' })
      }
    })
    .catch(err => {
      console.log(err)
      res.json(err)
    })
})

/*-----------------------*/
// EXPORT ROUTER        //
/*----------------------*/
module.exports = router