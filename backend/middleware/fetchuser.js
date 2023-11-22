const jwt = require('jsonwebtoken');
const JWT_SECRET = "thisIstoMyAuthenticatedUser";


const fetchuser = (req, res, next) => {
    // Get the user from jwt token and add id to req object
    const token = req.header('auth-token');

    if (!token) {
        console.log("No token matched");
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }


    try {

        // Converting passed token to user object
        const data = jwt.verify(token, JWT_SECRET);

        // Setting user of requested body to user od data retrieved
        req.user = data.user;

        // Passing on to next middleware
        next();

    } catch (error) {
        console.log(error.message);
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}

module.exports = fetchuser;