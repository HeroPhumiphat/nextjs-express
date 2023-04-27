const Users = require('../../models/Users')

module.exports = async (req, res) => {
  try {
    const validUsername = await Users.findOne({ username: req.body.username })

    if (validUsername) {
      return res.status(400).json({ error: 'username already exists' })
    }

    const form = req.body
    const doc = {
      name: form.name,
      username: form.username,
      age: form.age,
      email: form.email
    }
    await Users.create(doc)
    res.json({ createUser: 'success' })
  } catch (error) {
    res.json(error)
  }
}
