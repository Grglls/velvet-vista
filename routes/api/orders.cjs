const express = require('express');
const router = express.Router();
const ordersCtrl = require('../../controllers/api/orders.cjs');
const ensureLoggedIn = require('../../config/ensureLoggedIn.cjs');

// All routes start with /api/orders

// GET /api/orders/cart
router.get('/cart', ensureLoggedIn, ordersCtrl.cart);
// POST /api/orders/cart/items
router.post('/cart/items', ensureLoggedIn, ordersCtrl.addToCart);
// POST /api/orders/cart/checkout
router.post('/cart/checkout', ensureLoggedIn, ordersCtrl.checkout);
// GET /api/orders
router.get('/', ensureLoggedIn, ordersCtrl.index);

module.exports = router;