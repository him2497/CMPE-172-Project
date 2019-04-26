const express = require('express')
const mysql = require('mysql')
const port = 8080
const bodyParser = require('body-parser')
const passport = require('passport');
require('dotenv').config()


let app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

let connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    port     : 3306,
    password : process.env.DB_PASS, //TODO
    database : 'employee'
});
  
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
  });

app.use(passport.initialize());
app.use(passport.session());
require('./passport/passport').init(app)
  

const routes = require('./routes/index')
routes(app, connection)



app.listen(port, () => {
    console.log(port)
})


// SELECT emp_no from employees where email = 'Alejandro_Brender_79@xyz.com' AND (select emp_no from dept_manager where employees.emp_no = dept_manager.emp_no)

// SELECT * FROM employees order by emp_no LIMIT 50;
// SELECT * FROM dept_manager;