const router = require('express').Router()

router.get('/', require('../controllers/users/getUsers.js'))
router.post('/add', require('../controllers/users/postAddUser.js'))
router.get('/:id', require('../controllers/users/getUser.js'))

module.exports = router
