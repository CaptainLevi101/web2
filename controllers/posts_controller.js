const Post=require('../models/post');
module.exports.create = async function(req, res, next) {
    try {
      const post = await Post.create({
        content: req.body.content,
        user: req.user._id         //this is how dit is added in database
      });
      return res.redirect('back');
    } catch (err) {
      console.log('err in creating Post');
      return next(err); // Pass the error to the next middleware
    }
  };
  