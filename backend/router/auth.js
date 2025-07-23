const express = require('express');
const User = require('../modules/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');


//crete a user Using: post "/api/auth/." Doesn'n requreid auth
router.get('/', [
    body('name' , "Enter a validName").isLength({ min: 3 }),
    body('password' , "Password at lest 5").isLength({ min: 5 }),
    body('email' , "Enter a validemail").isEmail(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
     User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    }).then(user => res.json(user))
    .catch(err =>console.log(err))
    res.json({errors:"Plese enter a uniqe value" , message: errors.message})

  
    res.send(req.body)
});

module.exports = router;
