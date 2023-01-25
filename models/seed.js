/*-----------------------*/
// IMPORT DEPENDENCIES  //
/*----------------------*/
const mongoose = require('../utils/connection')
const Pet = require('./pet')

// build seed route, some starter pets
// router.get('/seed', (req, res) => {
//   const startPets = [
//     { name: 'Sherman', type: 'dog', color: 'white and brown', age: 12 },
//     { name: 'Cody', type: 'dog', color: 'white and black', age: 7 },
//     { name: 'Boots', type: 'cat', color: 'grey', age: 10 },
//     { name: 'Tigger', type: 'cat', color: 'brown', age: 11 },
//   ]
//   Pet.deleteMany({})
//     .then(() => {
//       Pet.create(startPets)
//         .then(data => {
//           res.json(data)
//         })
//         .catch(err => console.log('the following error occured: \n', err))
//     })    
// })

/*-----------------------*/
// SEED SCRIPT          //
/*----------------------*/
const db = mongoose.connection


db.on('open', () => {
  const startPets = [
        { name: 'Sherman', type: 'dog', color: 'white and brown', age: 12 },
        { name: 'Cody', type: 'dog', color: 'white and black', age: 7 },
        { name: 'Boots', type: 'cat', color: 'grey', age: 10 },
        { name: 'Tigger', type: 'cat', color: 'brown', age: 11 },
      ]
      Pet.deleteMany({  })
        .then(() => {
          Pet.create(startPets)
            .then(data => {
              console.log(data)
              db.close()
            })
            .catch(err => {
              console.log(err)
              db.close()
            })
        })
        .catch(err => {
          console.log(err)
          db.close()
        })
})
