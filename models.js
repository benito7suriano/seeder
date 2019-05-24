const Sequelize = require('Sequelize')
const db = new Sequelize('postgres://localhost:5432/plantr2', {logging: false})

const Gardener = db.define('gardeners', {
  name: Sequelize.STRING,
  age: Sequelize.INTEGER
})

const Plot = db.define('plots', {
  size: Sequelize.INTEGER,
  shaded: Sequelize.BOOLEAN
})

const Vegetable = db.define('vegetables', {
  name: Sequelize.STRING,
  color: Sequelize.STRING,
  plantedOn: Sequelize.DATE
})

// One-to-many
Plot.belongsTo(Gardener)
Gardener.hasOne(Plot)

// Many-to-many
Vegetable.belongsToMany(Plot, {through: 'vegetable_plot'})
Plot.belongsToMany(Vegetable, {through: 'vegetable-plot'})

Gardener.belongsTo(Vegetable, {as: 'favorite_vegetable'})

module.exports = { db, Gardener, Plot, Vegetable }
