const Users = require('../../models/Users')

module.exports = async (req, res) => {
  try {
    const docs = await Users.find().exec()
    await res.json({ users: docs })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' })
  }
}
