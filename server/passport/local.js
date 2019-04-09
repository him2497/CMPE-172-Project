module.exports = (connection) => {

    let passport = require('passport');
    let LocalStrategy = require('passport-local').Strategy;
    let bcrypt = require('bcryptjs');

    // Sign up
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
    
        connection.query("select * from employees where email = '"+email+"'",function(err,rows){
            console.log(rows);
            console.log("above row object");
            if (err)
                return done(err);
             if (rows.length) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
    
                let newUserMysql = new Object();
                
                newUserMysql.email    = email
                newUserMysql.password = password 
            
                var insertQuery = "INSERT INTO users ( email, password ) values ('" + email +"','"+ password +"')";
                    console.log(insertQuery);
                connection.query(insertQuery,function(err,rows){
                newUserMysql.id = rows.insertId;
                
                return done(null, newUserMysql);
                });	
            }	
        });
    }));

    // Login

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
         connection.query("SELECT * FROM `employees` WHERE `email` = '" + email + "'",function(err,rows){
			if (err)
                return done(err);
			 if (!rows.length) {
                return done(null, false, {'loginMessage': 'No user found.'}); // req.flash is the way to set flashdata using connect-flash
            } 

            bcrypt.compare(password, rows[0].password, function(err, res) {
                // res === true
                if (res === false)
                    return done(null, false, {'loginMessage': 'Oops! Wrong password.'}); // create the loginMessage and save it to session as flashdata
                });
			// if the user is found but the password is wrong
            // all is well, return successful user
            return done(null, rows[0]);			
		
		});
    }))
}