const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const customMware=require('./config/middleware');
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))

app.use(express.urlencoded());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
// make the uploads path available to the browser

// const sessionStore = MongoStore.create({
//     mongooseConnection: db,
//     autoRemove: 'disabled'
//     // mongoUrl: 'mongodb://localhost:27017/major',
//     // collectionName: 'Potter localhost:27017',
//     // ttl: 3600,
//     // session expiration time in seconds (optional)
//   });
//mongostore is  used to store session key in db
// const mongooseConnection = db.connection;

// const sessionStore = new MongoStore({
//     mongooseConnection, // Replace with your Mongoose connection
//     autoRemove: 'disabled'
//   }, function(err) {
//     console.log(err || 'connect-mongodb session OK');
//   });
// app.use(session({
//     name: 'social',
//     //change the secret beore deployment in production mode
//     secret: 'hshhtrue',
//     saveUninitialized: false,
//     cookie: {
//         maxAge:(1000*60*60),

//     },
//     store: sessionStore,
// }));
const store = new MongoStore({
    mongoUrl: 'mongodb://localhost:27017/major',
    collectionName: 'sessions',
    mongooseConnection: db,
    autoRemove: 'disabled'
});
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: store
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());

app.use(customMware.setFlash);



app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



app.use('/', require('./routes/index'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "./assets")));






//use routing before setting up the view engine


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