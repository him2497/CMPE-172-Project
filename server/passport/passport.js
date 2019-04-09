module.exports.init = function(app) {
    let passport = require('passport');
    const mysql = require('mysql')
    
    let connection = mysql.createConnection({
      host     : 'employee.ciz5qgzmyec8.us-west-1.rds.amazonaws.com',
      user     : 'root',
      port     :  3306,
      password : 'password', //TODO
      database : 'employee' 
    });

    passport.serializeUser(function(user, done) {
        console.log(user)
        done(null, user.emp_no);
    });

    // used to deserialize the user
    passport.deserializeUser(function(emp_no, done) {
        console.log(emp_no)
        connection.query("select * from employees where emp_no = " + emp_no, function(err,rows){
            console.log(rows)
            done(err, rows[0]);
        });
    });

    require('./local')(connection)
}
