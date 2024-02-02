const path = require('path');
const router = require('express').Router();
const tagController = require(path.resolve(CONTROLLER_DIR, 'tags'));

// Create a new tag
router.post('/', tagController.create);

// Read all tags
router.get('/', tagController.search);

module.exports = router;