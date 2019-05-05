
module.exports = (app, connection) => {
    let passport = require('passport')
    const jwt = require('jsonwebtoken')

    app.post('/auth/login', (req, res) => {
        passport.authenticate('local-login', async (err, user, info) => {
            if(err) console.log(err)
            console.log(user, info)
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


    app.get('/auth/github', passport.authenticate('github', { scope: [ 'read:user' ] }));

    app.get('/auth/github/callback', (req, res) => {
        passport.authenticate('github', async (err, user, info) => {
            if(err) console.log(err)
            if(info === "Success"){
                req.logIn(user, (err) => {
                    jwt.sign({user}, 'privatekey', { expiresIn: '1h' },(err, token) => {
                        if(err) { console.log(err) }
                        res.cookie('jwt', token, {maxAge: 1000 * 60 * 60});
                        res.header('Authorization', 'Bearer '+ token);
                        res.redirect("/loading")
                    });
                })
            }else {
                res.redirect(`/github-onboard/${req.email}`);
            }
        })(req, res)
    })

    app.get("/auth/isAuthenticated", (req, res) => {
        console.log(req.headers.authorization)
    })

    app.get('/auth/logout', (req,res) => {
        res.cookie('jwt', "", {maxAge: Date.now(0)});
        res.redirect("/")
    })
}