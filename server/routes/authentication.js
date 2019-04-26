
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


    app.get('/auth/github',
        passport.authenticate('github', { scope: [ 'read:user' ] }),
        function(req, res){
            // The request will be redirected to GitHub for authentication, so this
            // function will not be called.
    });

    app.get('/auth/github/callback', 
        passport.authenticate('github', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/dash');
    });
}