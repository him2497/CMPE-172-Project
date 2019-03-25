const express = require('express')
const mysql = require('mysql')
const port = 8080
const bodyParser = require('body-parser')

let app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    port     :  3306,
    password : 'password',
    database : 'employees'
});
  
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
  });



app.get('/:pageNo', (req, res) => {
    console.log(req.params.pageNo)
    let pageNo = req.params.pageNo-1
    connection.query(`SELECT * FROM employees order by emp_no LIMIT ${pageNo*25},25`, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
      });
      res.send('Hello World!')
})

app.post('/getRole', async (req, res) => {
    let email = await req.body.email
    await connection.query(`SELECT * from employees where email = ? AND (select emp_no from dept_manager where employees.emp_no = dept_manager.emp_no)`, 
    [email], function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
        res.send({results})
      });
})

app.listen(port, () => {
    console.log(port)
})


// SELECT emp_no from employees where email = 'Alejandro_Brender_79@xyz.com' AND (select emp_no from dept_manager where employees.emp_no = dept_manager.emp_no)

// SELECT * FROM employees order by emp_no LIMIT 50;
// SELECT * FROM dept_manager;