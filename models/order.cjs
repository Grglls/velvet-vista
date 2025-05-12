const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('./itemSchema.cjs');
const addressSchema = require('./addressSchema.cjs');
const { findOneAndUpdate } = require('./item.cjs');

const lineItemSchema = new Schema({
  item: itemSchema,
  quantity: { type: Number, required: true },
  size: { type: String, required: true },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});

// Virtual methods - called on the instance of the model:
lineItemSchema.virtual('totalPrice').get(function() {
  return this.item.price * this.quantity;
});

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lineItems: [lineItemSchema],
  // status: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending' },
  isPaid: { type: Boolean, default: false },
  address: addressSchema,
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});

// Virtual methods - called on an instance of the model:
orderSchema.virtual('totalPrice').get(function() {
  return this.lineItems.reduce((total, item) => total + item.totalPrice, 0);
});

orderSchema.virtual('totalQuantity').get(function() {
  return this.lineItems.reduce((total, item) => total + item.quantity, 0);
});

orderSchema.virtual('orderId').get(function() {
  // Use .id to return a string instead of ._id which returns an Object Id:
  return this.id.slice(-6);
});

// Static methods - called on the model itself:
orderSchema.statics.getCart = async function(userId) {
  // Use findOneAndUpdate to find the cart for the user, and create it if it doesn't exist (upsert):
  return this.findOneAndUpdate(
    { user: userId, isPaid: false },
    { user: userId },
    { upsert: true, new: true }
  )
};

// Instance method for adding an item to the cart:
orderSchema.methods.addToCart = async function(itemId, size, quantity) {
  // 'this' is bound to the cart instance, make a named const for clarity:
  const cart = this;
  // Check if the item (of that size) is already in the cart:
  const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId) && lineItem.size === size);
  if (lineItem) {
    // If it is, update the quantity:
    lineItem.quantity += quantity;
  } else {
    // Get the item from the database:
    const Item = mongoose.model('Item');
    const item = await Item.findById(itemId);
    // Add the new line item:
    cart.lineItems.push({ item, size, quantity });
  }
  // Return the save() method's promise:
  return cart.save();
};

// Instance method for setting an items quantity in the cart:
orderSchema.methods.setItemQuantity = async function(itemId, size, newQuantity) {
  // 'this' is bound to the cart instance, make a named const for clarity:
  const cart = this;
  // Find the item (of that size) in the cart:
  const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId) && lineItem.size === size);
  if (lineItem && newQuantity <= 0) {
    // If new quantity is <= 0, delete the line item:
    lineItem.deleteOne();
  } else if (lineItem) {
    // Otherwise, update the quantity:
    lineItem.quantity = newQuantity;
  }
  // Return the save() method's promise:
  return cart.save();
};

module.exports = mongoose.model('Order', orderSchema);