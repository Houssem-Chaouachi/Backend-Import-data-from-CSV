const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('../models/user');
const jwt = require('jsonwebtoken');

passport.use(
    new BearerStrategy(async (token, done) => {
        const tokenData = await jwt.verify(token, 'RANDOM_TOKEN');
        const user = await User.findOne({ _id: tokenData.data._id});
        if(!user) {
            return done(null, false);
        } 
        else return done(null, {user});
    })
);