
module.exports = (app, connection) => {
    let jwtToken = require('../utils/jwt')
    let checkJWT = require('../utils/checkJWT')
    const role = require('../utils/getRole')

    app.get('/check/access_control', checkJWT, jwtToken, async (req, res) => {
        role.getRole(req.email, function(error, result) {
            if(error) return error;
            res.send(result)
        })
    })

    app.get("/admin/pageCount", checkJWT, jwtToken, async (req, res) => { 
        connection.query("SELECT COUNT(*) FROM titles where to_date='9999-01-01'", (err, result) => {
            if (err) throw err;
            res.send({data: result[0]['COUNT(*)']})
        })
    })

    // Get the names of people in payroll
    app.get('/admin/:pageNo', checkJWT, jwtToken, async (req, res) => {
        const pageNo = req.params.pageNo-1
        role.getRole(req.email, async function(error, result) {
            if(error) return error;
            if(result === "Admin"){
                title = []
                salary = []
                user = []
                emp_no_arr = []

                await connection.query(`SELECT * FROM titles where to_date="9999-01-01" order by emp_no LIMIT ${pageNo*25},25`, function (error, results, fields) {
                    if (error) throw error;
                    // res.send(results)
                    Object.keys(results).forEach(function(key) {
                        var row = results[key];
                        title.push(row)
                        emp_no_arr.push(row.emp_no)
                      });
                      connection.query(`SELECT * FROM salaries where to_date="9999-01-01" order by emp_no LIMIT ${pageNo*25},25`, function (error, results, fields) {
                          if (error) throw error;
                          Object.keys(results).forEach(function(key) {
                              var row = results[key];
                              salary.push(row)
                            });
                            let emp_list = emp_no_arr.toString()
                            console.log(emp_list)
                          connection.query(`SELECT emp_no, first_name, last_name, email, gender FROM employees where FIND_IN_SET(emp_no, ?) order by emp_no LIMIT 25`,
                            emp_list, function (error, results, fields) {
                              if (error) throw error;
                              console.log("object", pageNo)
                              Object.keys(results).forEach(function(key) {
                                var row = results[key];
                                user.push(row)
                                console.log(user, salary, title)
                            });
                            res.send({
                                title: title,
                                salary: salary,
                                user
                            })
                          });
                      });
                });

                // res.send(response)
            }else{
                res.sendStatus(403)
            }
        })
    })


    // Edit the payroll info for a user

    // Delete a person from payroll

    // Change personal info for a user

}