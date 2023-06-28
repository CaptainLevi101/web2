const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    try {
        const post = await Post.findById(req.body.post);
        if (post) {
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            await post.save();
            return res.redirect('/');
        }
    } catch (err) {
        // Handle error
    }
}
module.exports.destroy = async function (req, res) {
    try {
      const comment = await Comment.findById(req.params.id).exec();
      
      if (comment.user == req.user.id) {
        const postId = comment.post;
  
        await comment.deleteOne();
  
        await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }).exec();
        
        return res.redirect('back');
      } else {
        return res.redirect('back');
      }
    } catch (err) {
      // Handle any errors that occurred during execution
      console.error(err);
      return res.redirect('back');
    }
  }
  
