const mysql = require('mysql')

var connection = mysql.createConnection({
  host     : 'employee.ciz5qgzmyec8.us-west-1.rds.amazonaws.com',
  user     : 'root',
  port     :  3306,
  password : 'password', //TODO
  database : 'employee'
});

exports.getRole = function(callback) {
  // console.log(email)
  let email = 'Vishwani_Minakawa_81@xyz.com'
  let result = null
  connection.query(`SELECT * from employees where email = ? AND (select emp_no from dept_manager where employees.emp_no = dept_manager.emp_no)`, 
    [email], function (error, results) {
        if (error) return callback(error);
        // console.log(results)
        if(results.length < 1){
          result = "Normal"
        }else{
          result = "Admin"
        }
        callback(null, result)
    })
}

