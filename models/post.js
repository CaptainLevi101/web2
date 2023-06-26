const mongoose=require('mongoose'); //imported mongoose
const postSchema=new mongoose.Schema({
    content:{              //created a schema
        type:String,
        required:true,
    },
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
   },
   //include the arrays of id of all comments in the post schema itself
   comments:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'comment'
   } 
},{
    timestamps:true   //create two fields created at and updated at
});
const Post=mongoose.model('Post',postSchema);
module.exports=Post;