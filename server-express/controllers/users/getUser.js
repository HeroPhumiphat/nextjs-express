const Users = require('../../models/Users')

module.exports = async (req, res) => {
  try {
    const id = req.params.id
    const user = await Users.findById(id)
    await res.json(user)
  } catch (error) {
    res.json('not fount doc')
  }
}
