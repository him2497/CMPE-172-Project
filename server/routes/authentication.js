
module.exports = (app, connection) => {
    let passport = require('passport')

    app.post('/auth/login', (req, res) => {
        passport.authenticate('local-login', async (err, user, info) => {
            if(err) console.log(err)
            return res.send({
                info,
                user
            })
        })(req, res)
    })

    app.post('/auth/register', (req, res) => {
        passport.authenticate('local-signup', async (err, user, info) => {
            if(err) console.log(err)
            res.send({
                info,
                user
            })
        })(req, res)
    })
}