module.exports = (app, connection) => {
    require('./admin')(app, connection)
    require('./profile')(app, connection)
    require('./authentication')(app, connection)
}