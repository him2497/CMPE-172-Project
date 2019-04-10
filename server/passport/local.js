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
    function(req, email, password,  done) {
        connection.query("select * from employees where email = '"+email+"'",function(err,rows){
            if (err)
                return done(err);
             if (rows.length) {
                return done(null, false, {'signupMessage': 'That email is already taken.'});
            } else {
    
                let newUserMysql = new Object();
                let {birth_date, first_name, last_name, gender} = req.body
                newUserMysql.email    = email
                newUserMysql.password = password
                newUserMysql.birth_date = birth_date
                newUserMysql.first_name = first_name
                newUserMysql.last_name = last_name
                newUserMysql.gender = gender

                let today = new Date();
                let dd = today.getDate();
                let mm = today.getMonth() + 1; 
                let yyyy = today.getFullYear();
                if (dd < 10) {
                dd = '0' + dd;
                } 
                if (mm < 10) {
                mm = '0' + mm;
                } 
                let hire_date = yyyy + '-' + mm + '-' + dd;

                newUserMysql.hire_date = hire_date
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(password, salt);
                var insertQuery = 
                "INSERT INTO employees (birth_date, first_name, last_name, gender, email, password, hire_date) values ('" + birth_date +"','"+ first_name +"','"+ last_name +"','"+ gender +"','"+ email +"','"+ hash +"','"+ hire_date +"')";
                connection.query(insertQuery,function(err, rows){
                    if (err)
                        return done(err);
                        connection.query("SELECT email, emp_no FROM employees where employees.emp_no =" + rows.insertId, (err, result) => {
                            if(err) throw err
                            return done(null, result[0]);
                        })
                });	
            }	
        });
    }));

    // Login

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
         connection.query("SELECT email, emp_no FROM `employees` WHERE `email` = '" + email + "'",function(err,rows){
			if (err)
                return done(err);
			 if (!rows.length) {
                return done(null, false, 'No user found.'); // req.flash is the way to set flashdata using connect-flash
            } 

            bcrypt.compare(password, rows[0].password, function(err, res) {
                if (res === false)
                    return done(null, false, 'Oops! Wrong password.'); // create the loginMessage and save it to session as flashdata
                });
			// if the user is found but the password is wrong
            // all is well, return successful user
            return done(null, rows[0]);			
		
		});
    }))
}