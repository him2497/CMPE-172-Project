let passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (connection) => {
    passport.use('google', new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true
      },
      function(req, accessToken, refreshToken, profile, done) {
        console.log(profile)
        let email = profile.emails[0].value
        connection.query("SELECT * FROM employees WHERE email='" + email +"'",function(err, rows){
            if (err)
                return done(err);
            if (rows.length < 1){
                req.email = email
                return done(null, "New", "New User")
            }
            return done(null, rows[0], "Success")
        });	
    }
    ));
}