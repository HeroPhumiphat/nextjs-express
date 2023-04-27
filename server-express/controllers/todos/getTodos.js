const Todos = require('../../models/Todos')

module.exports = async (req, res) => {
  try {
    const docs = await Todos.find().exec()
    const todos = []
    docs.map((doc, key) => {
      return todos.push({ id: doc._id, todo: doc.todo, completed: doc.completed, userId: doc.userId })
    })

    await res.json({ todos })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
}
