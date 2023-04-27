module.exports = (app) => {
  app.use('/', require('../routers/index'))
  app.use('/users', require('../routers/users'))
  app.use('/todos', require('../routers/todos'))
}
