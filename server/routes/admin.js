
module.exports = (app, connection) => {
    let jwtToken = require('../utils/jwt')
    let checkJWT = require('../utils/checkJWT')
    const role = require('../utils/getRole')

    // Get the names of people in payroll
    app.get('/:pageNo', checkJWT, jwtToken, async (req, res) => {
        const pageNo = req.params.pageNo-1
        role.getRole(req.email, function(error, result) {
            if(error) return error;
            if(result === "Admin"){
                connection.query(`SELECT * FROM employees order by emp_no LIMIT ${pageNo*25},25`, function (error, results, fields) {
                    if (error) throw error;
                    // console.log('The solution is: ', results);
                    res.send(results)
                });
            }else{
                res.sendStatus(403)
            }
        })
    })


    // Edit the payroll info for a user

    // Delete a person from payroll

    // Change personal info for a user

}