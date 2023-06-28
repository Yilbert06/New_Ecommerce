const product = require("./Product")
const category = require('./Category')

product.belongsTo(category)
category.hasMany(product)