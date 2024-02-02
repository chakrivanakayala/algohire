const path = require('path');
const router = require('express').Router();
const blogController = require(path.resolve(CONTROLLER_DIR, 'blogs'));

// Create a new blog
router.post('/', blogController.create);

// Read all blogs
router.get('/', blogController.search);

// Read a specific blog by ID
router.get('/:blogId', blogController.find);

// Update a specific blog by ID
router.put('/:blogId', blogController.update);

// Delete a specific blog by ID
router.delete('/:blogId', blogController.delete);

module.exports = router;