const User = require("../models/user");


module.exports.profile = async function (req, res) {
  try {
    const user = await User.findById(req.params.id).exec();
    return res.render('profile', {
      title: "social||Profile",
      profile_user: user
    });
  } catch (err) {
    // Handle any errors that occurred during execution
    console.error(err);
    return res.redirect('back');
  }
};

  // res.end('<h1>Ashish Parashar</h1>');
  // if (req.cookies.user_id) {
  //   User.findById(req.cookies.user_id)
  //     .then(function (user) {
  //       if (user) {
       
  //       } else {
  //         console.log("Invalid User");
  //         return res.redirect('back');
  //       }
  //     })
  //     .catch(function (err) {
  //       console.error(err);
  //       return res.redirect('back');
  //     });

    // if(User.findById(req.cookies.user_id,function(err,user){
    //   if(user){
    //     res.end('<h1>Ashish Parashar</h1>');
    //   }
    //   if(!user){
    //    console.log("INvalid User");
    //    return res.end('back');
    //   }
    // }));

  // }
  // else {
  //   return res.redirect('/users/sign-in');
  // }


module.exports.signUp = function (req, res) {
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  return res.render('user_sign_up', {
    title: "social||SignUp",
  });
}
module.exports.signIn = function (req, res) {
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  return res.render('user_sign_in', {
    title: "social||SignIn",
  });
}
//get the signed up data
module.exports.create = async function (req, res) {
  // console.log(req.body);
  try {
    if (req.body.password !== req.body.confirm_password) {
      return res.redirect('back');
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      await User.create(req.body);
      return res.redirect('/users/sign-in');
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    console.log('Error in user creation:', err);
    return res.redirect('back');
  }
};

//create session for the user
module.exports.createSession = async function (req, res) {
  // try {  <!------Manual uthentication-----------!>

  //   const user = await User.findOne({ email: req.body.email });
  //   if (!user) {
  //     console.log("user Not found");
  //     return res.redirect('back');
  //   } else {
  //     if (user.password != req.body.password) {
  //       console.log('Password disNot Match');
  //       return res.redirect('back');  <!------Manual uthentication-----------!>
  //     }
  //     res.cookie('user_id', user.id);
  //     return res.redirect('/users/profile');
  //   }
  // } catch (err) {
  //   console.log('Error in user sign_in:', err);
  //   return res.redirect('back');
  // }  <!------Manual uthentication-----------!>

  //find the user
  // User.findOne({email:req.body.email,function(err,user){
  //   if(err){
  //     console.log("error in user finding in ",err);
  //   }
  //    //handle user find
  //    if(user){
  //             if(user.password!=req.body.password){
  //               res.redirect('back');
  //             }
  //             //handle session creation
  //             res.cookie('user_id',user.id);
  //             return res.redirect('/users/profile');

  //    }
  //    else{
  //     res.redirect('back');
  //    }
  // }})
  //check whether the passwords match or not
  //TODO later
  //using passport .js
  return res.redirect('/');
}
module.exports.destroySession = function(req, res) {
  req.logout(function(err) {
    if (err) {
      console.log(err);
    }
    return res.redirect('/');
  });
};
module.exports.update = async function(req, res) {
  try {
    if (req.user.id == req.params.id) {
      const user = await User.findByIdAndUpdate(req.params.id, req.body);
      return res.redirect('back');
    } else {
      return res.status(401).send('Unauthorized');
    }
  } catch (err) {
    // Handle any errors that occurred during the process
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};

