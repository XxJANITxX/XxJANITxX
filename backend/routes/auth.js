// Handling /api/auth request

const express = require("express");
const User = require('../models/User');

// Using express router to respond on /api/auth request
const router = express.Router();
// Using body, validationResult to validate inputs from the user
const { body, validationResult } = require('express-validator');


router.post('/createuser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Enter a valid password").isLength({ min: 8 })
], async (req, res) => {

    // If error, retun bad request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    // Using create method to create user through manual mapping. Also checks whether user with same email exists or not

    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ error: "Sorry, the user already exists" });
        }

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        res.json(user);
    } catch (error) {
        console.log("Some error occured");
        res.status(500).send("Some error occured");
    }

})

module.exports = router;
