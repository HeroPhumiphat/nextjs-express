const Todos = require('../../models/Todos')

module.exports = async (req, res) => {
  try {
    const updateTodo = await Todos.findByIdAndUpdate(
      req.body.id,
      { todo: req.body.todo, completed: req.body.completed },
      { new: true }
    )
    if (updateTodo) {
      res.json({ success: true })
      console.log({ updateTodo })
    } else {
      res.json({ success: false, message: 'Todo not found' })
    }
  } catch (error) {
    res.json({ success: false, message: 'Failed to update todo' })
    console.log(error)
  }
}
