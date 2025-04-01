const Item = require('../../models/item.cjs');

module.exports = {
  index,
};

async function index(req, res) {
  try {
    // Get all items from the database:
    const items = await Item.find({});
    console.log(items);
    // Use res.json to send back just a string:
    // (the client code needs to take this into consideration)
    res.json(items);
  } catch (error) {
    res.status(400).json(error);
  }
}
