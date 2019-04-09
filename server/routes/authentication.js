
module.exports = (app, connection) => {
    let passport = require('passport')

    app.post('/auth/login', (req, res) => {
        console.log(req.body)
        passport.authenticate('local-login', async (err, user, info) => {
            if(err) console.log(err)
            res.send(user)
        })(req, res)
    })
}