const express = require('express')
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/signup', async (req, res) => {
    try {
        const { name, password, email } = req.body;

        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(400).json("Email already is in use");

        const newUser = new User({ name, password, email });
        await newUser.save();
        res.json("User added successfully");
    }
    catch (err){
        console.log(err);
        res.status(500).json("error adding user");
    }
});

router.post('/signin', async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if(!user){
            console.log('user not found');
            return res.status(400).json("Incorrect email or password");
        }

        console.log('email entered', email)
        console.log('user found', user);
        console.log('users password', password);
        console.log('hashed password from db', user.password);

        const passMatch = await user.comparePassword(password);
        console.log(passMatch);
        if(!passMatch) {
            console.log("wrong password");
            return res.status(400).json("Incorrect email or password");
        }

        const token = jwt.sign({userId: user._id, email: user.email}, JWT_SECRET, {expiresIn: '1h'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 10000000000,
        })

        res.json({message: 'Login Successful'});
    }
    catch (err){
        console.log(err);
        res.status(500).json("Error with the server");
    }
})

module.exports = router;