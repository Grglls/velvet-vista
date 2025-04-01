const express = require('express');
const router = express.Router();
const itemsCtrl = require('../../controllers/api/items.cjs');

// All routes start with /api/items

// GET /api/items
router.get('/', itemsCtrl.index);

module.exports = router;