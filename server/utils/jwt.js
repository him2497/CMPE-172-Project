module.exports = (req, res, next) => {
const jwt = require('jsonwebtoken');
    let token = req.token;
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    jwt.verify(req.token, 'privatekey', (err, authorizedData) => {
        if(err){
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else {
            //If token is successfully verified, we can send the autorized data 
            req.email = authorizedData.user.email
            req.emp_no = authorizedData.user.emp_no
            next()
            console.log('SUCCESS: Connected to protected route');
        }
    })
}