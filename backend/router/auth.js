const express = require('express');
const User = require('../modules/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');


//crete a user Using: post "/api/auth/createuser/."  No login required
router.get('/createuser', [
    body('name', "Enter a validName").isLength({ min: 3 }),
    body('password', "Password at lest 5").isLength({ min: 5 }),
    body('email', "Enter a validemail").isEmail(),
],
    async (req, res) => {
        //if there are no error, reture bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //check whether the user with this email exists already 
        let user = await User.findOne({ email: req.body.email })
        console.log(user)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
        })
        // .then(user => res.json(user))
        // .catch(err =>console.log(err))
        // res.json({errors:"Plese enter a uniqe value" , message: errors.message})


        res.send(req.body)

        res.json({"Good" : "Good"})
    });

module.exports = router;
