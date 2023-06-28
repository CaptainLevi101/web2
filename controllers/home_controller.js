const Post = require('../models/post');
const User= require('../models/user');
module.exports.home = async function (req, res) {
  try {
    const posts = await Post.find({})
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
        },
      })
      .exec();

    const users = await User.find({}).exec();

    return res.render('home', {
      title: 'Codeial | Home',
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    // Handle any errors that occurred during execution
    console.error(err);
    return res.redirect('back');
  }
};

// module.exports.actionName = function(req, res){}