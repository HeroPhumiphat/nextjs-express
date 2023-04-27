const dotenv = require('dotenv')
const path = require('path')
const isProd = require('./utils/isProd')

const dotenvOptions = {
  path: isProd
    ? path.join(__dirname, '.env.prod')
    : path.join(__dirname, '.env.dev')
}
dotenv.config(dotenvOptions)

const app = require('./bootstrap/express')
const connectMongoDB = require('./bootstrap/connectMongoDB')
const port = process.env.port

const startApp = async () => {
  try {
    await connectMongoDB()
    app.listen(port, () => {
      console.log(`Application listening on http://localhost:${port}`)
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
startApp()
