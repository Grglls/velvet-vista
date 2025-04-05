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

module.exports = mongoose.model('Order', orderSchema);