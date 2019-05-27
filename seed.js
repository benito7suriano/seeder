/**
 * const promiseForDog = Dog.findAll()
 *
 * promiseForDog.then((dog) => {
 *  console.log('Got a dog over here:' , dog)
 * })
 *
 * Promise.then(success, err)
 *
 * Promise Chaining
 *
 * The trick: every call to .then returns a promise
 *
 * const p1 = Dog.findById(1)
 * const p2 = p1.then(dog => {
 *  return dog.update()
 * })
 *
 * p2.then(result => {
 *  console.log(result)
 * })
 *
 * or...
 *
 * Dog.findById(1)
 *  .then(dog => {
 *  return dog.update()
 * })
 *  .then(result => {
 *  console.log(result)
 * })
 *  .catch(err => console.error(err))
 */
const { db, Gardener, Plot, Vegetable } = require('./models')

let brocolliG

db.sync({ force: true })
  .then(() => {
    console.log('Db sync\'d')
    return Promise.all([
      Vegetable.create({name: 'brocolli'}),
      Vegetable.create({name: 'cauliflor'}),
      Vegetable.create({name: 'lettuce'})
    ])
  })
  .then(([brocolli, cauliflor, lettuce]) => {
    brocolliG = brocolli

    return Gardener.create({name: 'Beno', favoriteVegetableId: brocolli.id})
  })
  .then((beno) => {
    return Plot.create({
      gardenerId: beno.id
    })
  })
  .then((plot) => {
    return plot.addVegetable(brocolliG)
    db.close()
  })
  .catch(() => {
    console.error('There has been some kind of error. Please try again later.')
    db.close()
  })
