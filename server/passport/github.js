let passport = require('passport');
let GitHubStrategy = require('passport-github2').Strategy;

module.exports = (connection) => {
    passport.use('github', new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: "http://localhost:3000/auth/github/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        let email = profile.emails[0].value
        let selectQuery = `SELECT * FROM employees WHERE email=${email}`
        console.log(selectQuery)
        connection.query("SELECT * FROM employees WHERE email='" + email +"'",function(err, rows){
            if (err)
                return done(err);
            if (rows.length < 1){
                console.log("New User")
            }

            return done(null, rows, "jjf")
        });	

        let first_name = ''
        let last_name = ''
        if(profile.displayName.length > 1){
            first_name = profile.displayName.split(" ")[0]
            last_name = profile.displayName.split(" ")[0]
        }
        let birth_date = "00-00-0000"
        let gender = "NONE"
        let hash = "NONE"

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

        // let insertQuery = 
        // "INSERT INTO employees (birth_date, first_name, last_name, gender, email, password, hire_date) values ('" + birth_date +"','"+ first_name +"','"+ last_name +"','"+ gender +"','"+ email +"','"+ hash +"','"+ hire_date +"')";
        // connection.query(insertQuery,function(err, rows){
        //     if (err)
        //         return done(err);
        //         connection.query("SELECT email, emp_no FROM employees where employees.emp_no =" + rows.insertId, (err, result) => {
        //             if(err) throw err
        //             return done(null, result[0], "Success");
        //         })
        // });	
      }
    ));
}