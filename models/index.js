const {Restaurant} = require('./Restaurant')
const {Menu} = require('./Menu')
const {Item} = require('./Item')

Menu.hasMany(Item);
Item.belongsTo(Menu)


module.exports = { Restaurant, Menu , Item}
