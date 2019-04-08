// module.exports = (app, connection) => {


//     // Checking the role of the user to ensure that no one has unprivilaged access 
//     app.post('/getRole', async (req, res) => {
//     let email = await req.body.email
//     await connection.query(`SELECT * from employees where email = ? AND (select emp_no from dept_manager where employees.emp_no = dept_manager.emp_no)`, 
//     [email], function (error, results) {
//         if (error) throw error;
//         message = {}
//         if(results.length < 1){
//           message = {"Role": "Normal"}
//         }else{
//           message = {"Role": "Admin"}
//         }
//         res.send(message)
//       });
//     })
// }

const mysql = require('mysql')

var connection = mysql.createConnection({
  host     : 'employee.ciz5qgzmyec8.us-west-1.rds.amazonaws.com',
  user     : 'root',
  port     :  3306,
  password : 'password',
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

