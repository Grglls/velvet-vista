const Item = require('../../models/item.cjs');

module.exports = {
  index,
  search,
};
  
async function index(req, res) {
  const items = await Item.find({}).sort('name').populate('category').exec();
  // re-sort based upon the sortOrder of the populated categories
  items.sort((a, b) => a.category.sortOrder - b.category.sortOrder);
  res.json(items);
}
  
async function search(req, res) {
  const results = await Item.find({
    'name': new RegExp(req.params.searchTerm, 'i')
  }).sort('name').populate('category').exec();
  // re-sort based upon the sortOrder of the populated categories
  results.sort((a, b) => a.category.sortOrder - b.category.sortOrder);
  res.json(results);
}
