const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const port=8000;
const path=require('path');
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const user=require('./models/user');
app.use('/',require('./routes/index'));
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "./assets")));
//use express router

//extract styles and scripts from sub pages into layouts
// app.set('layout extractStyles',true);
// app.set('layout extractScripts',true);
 
// 
app.listen(port,function(err){
    if(err){
        console.log(`error is ${err}`);
        return;
    }
    else{
        console.log("server is running");
    }

}) 