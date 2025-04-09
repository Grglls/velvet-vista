const express = require('express');
const router = express.Router();
const ordersCtrl = require('../../controllers/api/orders.cjs');
const ensureLoggedIn = require('../../config/ensureLoggedIn.cjs');

// All routes start with /api/orders

// GET /api/orders/cart
router.get('/cart', ensureLoggedIn, ordersCtrl.cart);

module.exports = router;