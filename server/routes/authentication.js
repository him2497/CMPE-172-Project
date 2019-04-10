
module.exports = (app, connection) => {
    let passport = require('passport')

    app.post('/auth/login', (req, res) => {
        passport.authenticate('local-login', async (err, user, info) => {
            console.log(req.body)
            if(err) throw err
            res.send({
                err: err,
                info,
                user
            })
        })(req, res)
    })

    app.post('/auth/register', (req, res) => {
        passport.authenticate('local-signup', async (err, user, info) => {
            if(err) console.log(err)
            res.send({
                err: err,
                info,
                user
            })
        })(req, res)
    })
}