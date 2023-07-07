const Like=require('../models/like');
const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.toggleLike=async function(req,res){
    try{
        const post=await Post.findById(req.params.id);
        const comment=await Comment.findById(req.params.id);
        let likable;
        let deleted=false;
        if(req.query.type=='Post'){
            likable=post;
        }
        else{
            likable=comment;
        }
        //check if like already exist or not
        let existingLike=await Like.findOne({
            likable:req.query.id,
            onModel:req.query.type,
            user:req.user.id
        })
        if(existingLike){
            likable.likes.pull(existingLike.id);
            likable.save();
            existingLike.remove();
            deleted=true;
        }
        else{
            let newLike=await Like.create({
                user:req.user.id,
                likable:req.query.id,
                onModel:req.query.type
            });
            likable.likes.push(newLike.id);
            likable.save();
        }
        return res.json(200,{
            message: 'request success',
            data:{
                deleted:deleted,
                likable:likable
            }
        })

       
    }
    catch(err){
        console.log(err);
                res.status(500).json({message:'server error'});
    }
}

