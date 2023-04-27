const { connect } = require('mongoose')

module.exports = async () => {
  await connect(process.env.MONGODB_URL)
}
