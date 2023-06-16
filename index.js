const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const user = require('./models/user');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');

app.use(express.urlencoded());
app.use(cookieParser());
const sessionStore = MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/major',
    collectionName: 'Potter localhost:27017',
    ttl: 3600,
    // session expiration time in seconds (optional)
  });
//mongostore is  used to store session key in db
// const mongooseConnection = db.connection;

// const sessionStore = new MongoStore({
//     mongooseConnection, // Replace with your Mongoose connection
//     autoRemove: 'disabled'
//   }, function(err) {
//     console.log(err || 'connect-mongodb session OK');
//   });
app.use(session({
    name: 'social',
    //change the secret beore deployment in production mode
    secret: 'hshhtrue',
    saveUninitialized: false,
    cookie: {
        maxAge:(1000*60*60),

    },
    store: sessionStore,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use('/', require('./routes/index'));


app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "./assets")));






//use routing before setting up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//beware of all the facts before proceeding to the next step

//use express router

//extract styles and scripts from sub pages into layouts
// app.set('layout extractStyles',true);
// app.set('layout extractScripts',true);

// 

app.listen(port, function (err) {
    if (err) {
        console.log(`error is ${err}`);
        return;
    }
    else {
        console.log("server is running");
    }

}) 