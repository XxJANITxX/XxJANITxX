// Handling /api/auth request

const express = require("express");
const User = require('../models/User');

// Using express router to respond on /api/auth request
const router = express.Router();
// Using body, validationResult to validate inputs from the user
const { body, validationResult } = require('express-validator');
// Importing bcryptjs
const bcrypt = require('bcryptjs');
// Importing JWT secret
const jwt = require('jsonwebtoken');

// Creating JWT secret String
const JWT_SECRET = "thisIstoMyAuthenticatedUser";

// Importing fetchUser middleware
const fetchuser = require('../middleware/fetchuser')


// ROUTE 1: Createing user using post "http://localhost:5000/api/auth/createuser"
router.post('/createuser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Enter a valid password").isLength({ min: 8 })
], async (req, res) => {

    // If error, return bad request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    // Using create method to create user through manual mapping. Also checks whether user with same email exists or not

    try {

        // Checking whether user exists or not
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ error: "Sorry, the user already exists" });
        }

        // Using bcrypt to create salt and converting password to hashString
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);


        // Creating user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        // Data object which will send user id as data
        const data = {
            user: {
                id: user.id
            }
        }
        // Authorization token created using jwt
        const authtoken = jwt.sign(data, JWT_SECRET);

        // Responding with authtoken
        res.json({ authtoken });

    } catch (error) {

        // Handling error
        console.log("Some error occured" + "\n" + error);
        res.status(500).send("Internal error occured");
    }

})



// ROUTE 2: Authenticating a user using post "http://localhost:5000/api/auth/login"
router.post('/login', [
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password must not be empty").exists()
], async (req, res) => {

    // If error, return bad request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    try {

        // Destructuring email and password from request body
        const { email, password } = req.body;

        // Finding user with same email shown
        let user = await User.findOne({
            email: email
        })

        // If user not found, responding with incorrect credentials error
        if (!user) {
            return res.status(400).json({ error: "Login with correct credentials" });
        }

        // Comparing password got from user object 
        const passwordCompare = await bcrypt.compare(password, user.password);

        // If password not same, responding with incorrect credentials error 
        if (!passwordCompare) {
            return res.status(400).json({ error: "Login with correct credentials" });
        }

        // Data object which will send user id as data
        const data = {
            user: {
                id: user.id
            }
        }
        // Authorization token created using jwt
        const authtoken = jwt.sign(data, JWT_SECRET);

        // Responding with authtoken
        res.json({ authtoken });

    } catch (error) {
        // Iternal server error 
        console.log("Some error occured", error.message);
        res.status(500).send("Some error occured");
    }

})

// ROUTE 3: Get logged in user details using post "http://localhost:5000/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {

        // Getting user Id fetched in middleware
        let userId =  req.user.id;

        // Finding user by using ID and neglecting password
        const user = await User.findById(userId).select("-password");

        // Responding with user data
        res.send(user);

    } catch (error) {
        console.log(error.message);
        console.log(error)
        res.status(500).send("Internal Server Error");
    }
})


// Exporting router
module.exports = router;
