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
const { db } = require('./models')

db.sync({ force: true })
  .then(() => {
    console.log('Db sync\'d')
    db.close()
  })
  .catch(() => {
    console.error('There has been some kind of error. Please try again later.')
    db.close()
  })
