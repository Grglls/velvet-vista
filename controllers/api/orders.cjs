const Order = require('../../models/order.cjs');

module.exports = {
  cart,
  addToCart,
  setItemQuantity,
  checkout,
  index,
  show,
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
