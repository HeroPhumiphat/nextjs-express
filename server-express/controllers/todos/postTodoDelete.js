const Todos = require('../../models/Todos')

module.exports = async (req, res) => {
  try {
    const deletedTodo = await Todos.findByIdAndDelete(req.body.id)
    if (deletedTodo) {
      res.json({ success: true })
      console.log({ deletedTodo })
    } else {
      res.json({ success: false, message: 'Todo not found' })
    }
  } catch (error) {
    res.json({ success: false, message: 'Failed to delete todo' })
    console.log(error)
  }
}
