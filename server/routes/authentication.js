
module.exports = (app, connection) => {
    let passport = require('passport')
    const jwt = require('jsonwebtoken')

    app.post('/auth/login', (req, res) => {
        passport.authenticate('local-login', async (err, user, info) => {
            if(err) console.log(err)
            if(info === "Success"){
                jwt.sign({user}, 'privatekey', { expiresIn: '1h' },(err, token) => {
                    if(err) { console.log(err) }    
                    res.send({
                        info,
                        token
                    });
                });
            }else{
                return res.send({
                    info            
                })
            }
        })(req, res)
    })

    app.post('/auth/register', (req, res) => {
        passport.authenticate('local-signup', async (err, user, info) => {
            if(err) console.log(err)
            if(info === "Success"){
                jwt.sign({user}, 'privatekey', { expiresIn: '1h' },(err, token) => {
                    if(err) { console.log(err) }    
                    res.send({
                        info,
                        token
                    });
                });
            }else{
                return res.send({
                    info            
                })
            }
        })(req, res)
    })
}