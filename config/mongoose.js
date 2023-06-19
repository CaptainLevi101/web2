//require the library 
const mongoose=require('mongoose');
//connnect to the database 
mongoose.connect('mongodb://localhost:27017/major',{useNewUrlParser:true,useUnifiedTopology:true});
//acquire the connection to check if it is successful
const db=mongoose.connection;
//error
db.on('error',console.error.bind(console,'error connecting to db'));
//up and running the print message
db.once('open',function(){
    console.log('successfully connected');
});
