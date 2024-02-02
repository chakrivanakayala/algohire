const path = require('path');
const router = require('express').Router();
const commentController = require(path.resolve(CONTROLLER_DIR, 'comment'));

// Create a new comment
router.post('/', commentController.create);

// Read all comments for a specific blog
router.get('/:blogId', commentController.find);

module.exports = router;