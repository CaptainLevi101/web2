const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;

const ExtractJWT=require('passport-jwt').ExtractJwt;
const User=require('../models/user');

const opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'secret'
};
passport.use(new JWTStrategy(opts, function(jwtPayLoad,done){
    User.findById(jwtPayLoad.id,function(err,user){
        if(err){
            return done(err,false);
        }
        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    }
);}
));