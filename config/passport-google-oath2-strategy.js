const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');

passport.use(new googleStrategy({
  clientID: "709659716612-0bdru1tbi86q32bpus9po778h7v1bhtc.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:8000/users/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOne({ email: profile.emails[0].value });

    if (user) {
      return done(null, user);
    } else {
      const newUser = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        password: crypto.randomBytes(20).toString('hex')
      });

      return done(null, newUser);
    }
  } catch (err) {
    console.log("error in google strategy passport", err);
    return done(err, null);
  }
}));

module.exports = passport;
