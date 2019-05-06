
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
    app.get('/admin/get/:emp_no', checkJWT, jwtToken, async (req, res) => {
        console.log(req.params.emp_no)
        if(req.params.emp_no !== NaN){
            let personalInfo = {}
            await connection.query("select title from titles where to_date = '9999-01-01' and emp_no = '"+req.params.emp_no+"'",function(err,rows){
                if(err){
                    return err
                }
                personalInfo.title = rows[0].title
            })
    
            await connection.query("select salary from salaries where to_date = '9999-01-01' and emp_no = '"+req.params.emp_no+"'",function(err,rows){
                if(err){
                    return err
                }
                personalInfo.salary = rows[0].salary
            })
            
            await connection.query("select first_name,last_name,email, hire_date from employees where emp_no = '"+req.params.emp_no+"'",function(err,rows){
                if(err){
                    return err
                }
                res.status(200).send({profile: rows[0], personalInfo})
            })
        }
    })

    // Delete a person from payroll
    app.get('/admin/delete/user/:emp_no', checkJWT, jwtToken, async (req, res) => {
        if(req.params.emp_no !== NaN){
            let personalInfo = {}
            await connection.query("delete from titles where to_date = '9999-01-01' and emp_no = '"+req.params.emp_no+"'",function(err,rows){
                if(err){
                    return err
                }
            })
    
            await connection.query("delete from salaries where to_date = '9999-01-01' and emp_no = '"+req.params.emp_no+"'",function(err,rows){
                if(err){
                    return err
                }
            })
            
            await connection.query("delete from employees where emp_no = '"+req.params.emp_no+"'",function(err,rows){
                if(err){
                    return err
                }
            })
            res.status(200).send({info: "Success"})
        }
    })


    // Change personal info for a user
    app.post('/admin/update/personal/:emp_no', checkJWT, jwtToken, async (req, res) => {
        console.log(req.body)
        console.log(req.params.emp_no)
        if(req.params.emp_no !== NaN){            
            await connection.query("update employees set first_name='"+req.body.first_name+"' ,last_name='"+req.body.last_name+"',email='"+req.body.email+"' where emp_no = '" + req.params.emp_no+"'",function(err,rows){
                if(err){
                    return err
                }
                res.status(200).send({info: "Success"})
            })
        }
    })

    app.post('/admin/update/title/:emp_no', checkJWT, jwtToken, async (req, res) => {
        console.log(req.params.emp_no)
        if(req.params.emp_no !== NaN){            
            await connection.query("update titles set title='"+req.body.title+"' where emp_no = '" + req.params.emp_no+"'",function(err,rows){
                if(err){
                    return err
                }
                res.status(200).send({info: "Success"})
            })
        }
    })

    app.post('/admin/update/salary/:emp_no', checkJWT, jwtToken, async (req, res) => {
        console.log(req.params.emp_no)
        console.log(req.body)
        if(req.params.emp_no !== NaN){            
            await connection.query("update salaries set salary='"+req.body.salary+"'where emp_no = '" + req.params.emp_no+"'",function(err,rows){
                if(err){
                    return err
                }
                res.status(200).send({info: "Success"})
            })
        }
    })

}