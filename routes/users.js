const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');


const User = require('../models/user');


//register
router.post('/register', (req ,res , next) => {
    
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) =>{
        if(err){
            res.json({success: false, msg:'Failed in user registration'});
        }else{
            res.json({success: true, msg:'user register success' });
        }
    });
});

//authenticate
router.post('/authenticate', (req ,res ,next) => {
    let username = req.body.username;
    let password = req.body.password;

    User.getUserByUserName(username, (err, user)=>{
        if(err) throw err;
        if(!user){
            return req.json({success:"false", msg:"User not found"});
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 21312321
                });
                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        name: User.name,
                        email: User.email,
                        username: User.username

                    }


                });
            }
        });
    });
});
//profile (protect with authenticate)
router.get('/profile', (req ,res ,next) => {
    res.send('PROFILE PAGE'); //to test the code
});

module.exports = router;