const express = require('express');
const router = express.Router();
const itemsCtrl = require('../../controllers/api/items.cjs');

// All routes start with /api/items

// GET /api/items
router.get('/', itemsCtrl.index);
// GET /api/items/search/:searchTerm
router.get('/search/:searchTerm', itemsCtrl.search);

module.exports = router;