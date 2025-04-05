const express = require('express');
const router = express.Router();
const ordersCtrl = require('../../controllers/api/orders.cjs');

// All routes start with /api/orders

// GET /api/orders/cart
router.get('/cart', ordersCtrl.cart);

module.exports = router;