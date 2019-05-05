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
                return done(null, false, 'That email is already taken.');
            } else {
    
                let newUserMysql = new Object();
                let {birth_date, first_name, last_name, gender} = req.body
                newUserMysql.email    = email
                newUserMysql.password = password
                newUserMysql.birth_date = birth_date
                newUserMysql.first_name = first_name
                newUserMysql.last_name = last_name
                newUserMysql.gender = gender
                if(req.body.SSO !== undefined){
                    newUserMysql.SSO = req.body.SSO
                }

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

                let insertQuery = ''
                if(newUserMysql.SSO){
                    console.log("object")
                    insertQuery = 
                    "INSERT INTO employees (birth_date, first_name, last_name, gender, SSO, email, password, hire_date) values ('" + birth_date +"','"+ first_name +"','"+ last_name +"','"+ gender +"','"+ newUserMysql.SSO +"','"+ email +"','"+ hash +"','"    + hire_date +"')";    
                }else{
                    insertQuery = 
                    "INSERT INTO employees (birth_date, first_name, last_name, gender, email, password, hire_date) values ('" + birth_date +"','"+ first_name +"','"+ last_name +"','"+ gender +"','"+ email +"','"+ hash +"','"+ hire_date +"')";                    
                }

                connection.query(insertQuery,function(err, rows){
                    if (err)
                        return done(err);
                        let emp_no
                        connection.query("SELECT email, emp_no, hire_date FROM employees where employees.emp_no =" + rows.insertId, async (err, results) => {
                            if(err) throw err
                            emp_no = rows.insertId
                            await connection.query("INSERT INTO titles (emp_no, title, from_date, to_date) values ('" + emp_no +"','"+ " " +"','"+ newUserMysql.hire_date +"','"+ '9999-01-01' +"')", (err, result) => {
                                if(err) throw err
                            })
                            await connection.query("INSERT INTO salaries (emp_no, salary, from_date, to_date) values ('" + emp_no +"','"+ "60000" +"','"+ newUserMysql.hire_date +"','"+ '9999-01-01' +"')", (err, result) => {
                                if(err) throw err
                            })
                            return done(null, results[0], "Success");
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
    async function(req, email, password, done) { // callback with email and password from our form
        if(password !== undefined){
         await connection.query("SELECT email, emp_no, password FROM `employees` WHERE `email` = '" + email + "'", async function(err,rows){
			if (err)
                return done(err);
			 if (!rows.length) {
                return done(null, false, 'No user found.'); // req.flash is the way to set flashdata using connect-flash
            } 
                await bcrypt.compare(password, rows[0].password).then((res) => {
                    if (res === false){
                        done(null, false, 'Oops! Wrong password.'); 
                    }else if(res === true){
                        done(null, {"email" : rows[0].email, "emp_no" : rows[0].emp_no}, "Success");			
                    }
                }).catch(err => {
                    console.log(err)
                    done(err)
                });
            });
        }
    }))
}