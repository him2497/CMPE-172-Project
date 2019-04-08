const express = require('express')
const mysql = require('mysql')
const port = 8080
const bodyParser = require('body-parser')

let app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var connection = mysql.createConnection({
    host     : 'employee.ciz5qgzmyec8.us-west-1.rds.amazonaws.com',
    user     : 'root',
    port     :  3306,
    password : 'password',
    database : 'employee'
});
  
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
  });



const routes = require('./routes/index')
routes(app, connection)




app.listen(port, () => {
    console.log(port)
})


// SELECT emp_no from employees where email = 'Alejandro_Brender_79@xyz.com' AND (select emp_no from dept_manager where employees.emp_no = dept_manager.emp_no)

// SELECT * FROM employees order by emp_no LIMIT 50;
// SELECT * FROM dept_manager;