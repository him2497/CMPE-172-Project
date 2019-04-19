module.exports = (app, connection) => {
    let jwtToken = require('../utils/jwt')
    let checkJWT = require('../utils/checkJWT')
    //get the profile info for the user

    app.get('/user/data', checkJWT, jwtToken, async (req, res) => {
        let personalInfo = {}
        await connection.query("select title from titles where to_date = '9999-01-01' and emp_no = '"+req.emp_no+"'",function(err,rows){
            if(err){
                return err
            }
            personalInfo.title = rows[0].title
        })

        await connection.query("select salary from salaries where to_date = '9999-01-01' and emp_no = '"+req.emp_no+"'",function(err,rows){
            if(err){
                return err
            }
            personalInfo.salary = rows[0].salary
        })
        
        await connection.query("select first_name,last_name,email,gender,emp_no,birth_date,hire_date from employees where emp_no = '"+req.emp_no+"'",function(err,rows){
            if(err){
                return err
            }
            res.status(200).send({profile: rows[0], personalInfo})
        })


    })
    

}