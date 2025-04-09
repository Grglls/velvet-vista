const { add } = require('../../models/itemSchema.cjs');
const Order = require('../../models/order.cjs');

module.exports = {
  cart,
  addToCart,
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
