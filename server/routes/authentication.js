
module.exports = (app, connection) => {
    let passport = require('passport')

    app.post('/auth/login', (req, res) => {
        passport.authenticate('local-login', async (err, user, info) => {
            if(err) console.log(err)
            res.send(user)
        })(req, res)
    })

    app.post('/auth/register', (req, res) => {
        passport.authenticate('local-signup', async (err, user, info) => {
            if(err) console.log(err)
            console.log(info)
            res.send(user)
        })(req, res)
    })
}