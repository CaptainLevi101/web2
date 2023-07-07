const mongoose = require('mongoose');
const path=require('path');
const likeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //this defines the object id of liked object
    likable:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'onModel'
    },
    //define the type of liked object since this is dynamic reference
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment'],
    }
},
    {timestamps:true}
);
const Like=mongoose.model('Like',LikeSchema);
module.exports=Like;