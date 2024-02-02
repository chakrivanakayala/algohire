const path = require('path')

const router = require('express').Router()

const userController = require(path.resolve(CONTROLLER_DIR ,'user') )
router.post('/', userController.create) // router for creating a new  .for now no need
router.post('/login' , userController.login) // for logining the user
module.exports = router