module.exports.profile = function (req, res) {
    res.end('<h1>Ashish Parashar</h1>');
}
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"social||SignUp",
    });
}
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:"social||SignIn",
    });
}
//get the signed up data
module.exports.create=function(req,res){
   //todo later
}
//create session for the user
module.exports.createSession=function(req,res){
    //TODO later
}