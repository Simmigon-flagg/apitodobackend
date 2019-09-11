const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

router.post('/signup', (req, res, next) => {
    User.find({
        email: req.body.email
    }).exec().then(user => {
        if (user.length >= 1) {
            return res.status(422).json({
                message: 'Already Exist'
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                        dateJoined: new Date()
                    })
                    user
                        .save()
                        .then(result => {
                            console.log(result)
                            res.status(201).json({
                                message: 'User Created'

                            });
                        })
                        .catch(err => {
                            res.status(500).json({
                                error: err
                            });
                        });
                }
            });
        }
    })


});


router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(users => {
            if (users < 1) {
                return res.status(400).json({
                    message: "User name or password is incorrect"
                })
            }
            bcrypt.compare(req.body.password, users[0].password, function (err, result) {
                if(err){
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }
                if(result){
                    return res.status(200).json({
                        message: "Auth Successful"
                    })
                }
                res.status(401).json({
                    message: 'User name or password is incorrect'
                })
            });

        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
})

router.delete('/:userId', (req, res, next) => {
    User.remove({
        _id: req.body.userId
    }).exec().then(result => {
        res.status(200).json({
            message: 'User Removed'
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

module.exports = router;