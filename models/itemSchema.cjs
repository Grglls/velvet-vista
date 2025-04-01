const Schema = require('mongoose').Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  category: {type: Schema.Types.ObjectId, ref: 'Category'},
  price: { type: Number, required: true },
  sizes: [{ type: String, required: true }],
  image: { type: String }
}, {
  timestamps: true
});

module.exports = itemSchema;