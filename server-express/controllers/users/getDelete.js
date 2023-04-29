const Users = require('../../models/Users')

module.exports = async (req, res) => {
  try {
    await Users.findByIdAndDelete(req.params.id)
    res.json({ state: 'success' })
  } catch (error) {
    res.json({ error })
  }
}
