const router = require('express').Router()

router.get('/', require('../controllers/todos/getTodos'))
router.post('/add', require('../controllers/todos/postAddTodo'))
router.post('/edit', require('../controllers/todos/postTodoEdit'))
router.post('/delete/', require('../controllers/todos/postTodoDelete'))
router.get('/:userId', require('../controllers/todos/getTodosByUserId'))

module.exports = router
