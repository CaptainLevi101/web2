const express=require('express');
const app=express();
const port=8000;
//use express router
app.use('/',require('./routes/index'));
app.set('view engine', 'ejs');
app.listen(port,function(err){
    if(err){
        console.log(`error is ${err}`);
        return;
    }
    else{
        console.log("server is running");
    }

})