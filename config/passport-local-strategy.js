const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy
    ;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
},
    async function (req,email, password, done) {
        //find a user and establish a identity
        try {
            const user = await User.findOne({ email: email });

            if (!user || user.password !== password) {
                req.flash('error', 'invalid UserName/Password');
                return done(null, false);
            }

            return done(null, user);
        } catch (err) {
            req.flash('error', err);
            return done(err);
        }

    }
));
//we need serialized and desierialized user function
//serialize the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById(id);

        if (!user) {
            console.log('User not found');
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
        console.log('Error in finding user', err);
        return done(err);
    }
});
//check if user is authenticated
passport.checkAuthentication=function(req,res,next){
    // if the user is signed in then pass on the request to next function 
 if(req.isAuthenticated()){
    return next();
 }
 //if the user is not signed in 
 return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser=function(req,res,next){
     if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie
        //and we are just sending the local for the views
        res.locals.user=req.user;
     }
     next();
}
module.exports = passport;
