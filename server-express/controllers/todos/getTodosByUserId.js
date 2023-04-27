const Todos = require('../../models/Todos')

module.exports = async (req, res) => {
  try {
    const id = req.params.userId
    const todos = await Todos.find({ userId: id })
    res.json(todos)
  } catch (error) {
    res.json(error)
  }
}
