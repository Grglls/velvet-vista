const Item = require('../../models/item.cjs');

module.exports = {
  index,
};
  
async function index(req, res) {
  const items = await Item.find({}).sort('name').populate('category').exec();
  // re-sort based upon the sortOrder of the populated categories
  items.sort((a, b) => a.category.sortOrder - b.category.sortOrder);
  res.json(items);
}
