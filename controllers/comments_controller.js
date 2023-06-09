const Comment = require('../models/comment');
const Post = require('../models/post');
const commentMailer=require('./mailers/comments_mailers');
const commentEmailWorker=require('../workers/comment_email_worker');
const queue = require('../config/kue');
const Like= require('../models/like');
module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
           
            console.log(req.xhr);
            comment = await comment.populate('user', 'name email');
            console.log(comment);
            let job =queue.create('email',comment).save(function(err){
              if(err){
                console.log('error in creating queue');
              }
              console.log('job done success',job.id);
            });
            //  commentMailer.newComment(//
            //comment
            if (req.xhr){
           
                // Similar for comments to fetch the user's id!
               
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }


            req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}


module.exports.destroy = async function(req, res) {
    try {
        console.log(req.xhr);
      
      let comment = await Comment.findById(req.params.id);
  
      if (comment.user== req.user.id) {
       
        // console.log(req.xhr);
        let postId = comment.post;
        console.log(postId);
       
        await comment.deleteOne();
        await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
        await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
         console.log(req.xhr);
      
        // Send the comment ID which was deleted back to the views
        if (req.xhr) {
            
             return res.status(200).json({
              
               data: {
                
                 comment_id: req.params.id
               },
               message: "Comment deleted"
             });
           }
        
  
        req.flash('success', 'Comment deleted!');
        return res.redirect('back');
      } else {
        req.flash('error', 'Unauthorized');
        return res.redirect('back');
      }
    } catch (err) {
      req.flash('error', err);
      return;
    }
  };
  