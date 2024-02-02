const path = require('path');
const router = require('express').Router();
const categoryController = require(path.resolve(CONTROLLER_DIR, 'categories'));

// Create a new category
router.post('/', categoryController.create);

// Read all categories
router.get('/', categoryController.search);

module.exports = router;