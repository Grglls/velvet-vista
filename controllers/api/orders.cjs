const Order = require('../../models/order.cjs');
const mongoose = require('mongoose');

module.exports = {
  cart,
  addToCart,
  setItemQuantity,
  checkout,
  index,
  show,
  getAddresses,
};
  
async function cart(req, res) {
  const cart = await Order.getCart(req.user._id);
  res.json(cart);
}

async function addToCart(req, res) {
  const cart = await Order.getCart(req.user._id);
  await cart.addToCart(req.body.itemId, req.body.size, req.body.quantity);
  res.json(cart);
}

async function setItemQuantity(req, res) {
  const cart = await Order.getCart(req.user._id);
  await cart.setItemQuantity(req.body.itemId, req.body.size, req.body.quantity);
  res.json(cart);
}

async function checkout(req, res) {
  const cart = await Order.getCart(req.user._id);
  cart.address = req.body.address;
  cart.isPaid = true;
  await cart.save();
  res.json(cart);
}

async function index(req, res) {
  const orders = await Order.find({ 
    'user': req.user._id,
    'isPaid': true 
  }).sort('updateAt');
  res.json(orders);
}

async function show(req, res) {
  const order = await Order.findOne({ 
    'user': req.user._id,
    '_id': req.params.id,
  });
  res.json(order);
}

async function getAddresses(req, res) {
  // Note: the aggregate query runs directly on the MongoDB, 
  //  so we need to convert the user ID to a MongoDB ObjectId.
  // The index and show functions above use Mongoose's query methods,
  //  which automatically convert the user ID to an ObjectId for us.
  const userId = new mongoose.Types.ObjectId(req.user._id);
  const addresses = await Order.aggregate([
    { $match: { user: userId, isPaid: true } },
    { $project: {
        address: {
          firstName: "$address.firstName",
          lastName: "$address.lastName",
          phone: "$address.phone",
          street: "$address.street",
          city: "$address.city",
          state: "$address.state",
          postcode: "$address.postcode",
          country: "$address.country"
        }
      }
    },
    { $group: {
        _id: {
          firstName: "$address.firstName",
          lastName: "$address.lastName",
          phone: "$address.phone",
          street: "$address.street",
          city: "$address.city",
          state: "$address.state",
          postcode: "$address.postcode",
          country: "$address.country"
        }
      }
    },
    { $replaceRoot: { newRoot: "$_id" } }
  ]);
  res.json(addresses);
}
