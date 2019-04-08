
module.exports = (app, connection) => {
    const role = require('./role.js')
    
    // Get the names of people in payroll
    app.get('/:pageNo', (req, res) => {
        const pageNo = req.params.pageNo-1
        role.getRole(function(error, result) {
            if(error) return error;
            console.log(result)
        })
        connection.query(`SELECT * FROM employees order by emp_no LIMIT ${pageNo*25},25`, function (error, results, fields) {
            if (error) throw error;
            // console.log('The solution is: ', results);
            res.send(results)
        });
    })


    // Edit the payroll info for a user

    // Delete a person from payroll

    // Change personal info for a user

}