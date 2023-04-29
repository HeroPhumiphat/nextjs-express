const Todos = require('../../models/Todos')
const Users = require('../../models/Users')

module.exports = async (req, res) => {
  const validTodoUserId = await Todos.findOne({ userId: req.body.userId })
  const validTodoTodo = await Todos.findOne({ todo: req.body.todo })

  if (validTodoUserId && validTodoTodo) {
    return res.status(400).json({ error: 'content already exists' })
  }

  const user = await Users.findOne({ _id: req.body.atUserId })

  const form = req.body
  const data = {
    todo: form.todo,
    completed: form.completed,
    userId: user._id
  }

  try {
    await Todos.create(data)
    res.json({ save: true })
  } catch (error) {
    console.log(error)
    res.json({ save: false })
  }
}
