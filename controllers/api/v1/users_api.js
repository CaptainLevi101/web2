const User=require('../../../models/user');
const jwt=require('jsonwebtoken');
module.exports.createSession= async function(req,res){
    try{
        let user=await User.findOne({email:req.body.email});
        if(!user || user.password!=req.body.password){
            return res.json(401, {
                message: "Invalid Username or Password"
              });
        }
        const userObject = user.toObject(); 
        return res.json(200,{
            message:'Sign In successful,Here is your token',
            data:{
                token:jwt.sign(userObject,'secret',{expiresIn:'10000'})
            }
        })

    }
    catch(err){
        console.log('error generated',err);
        return res.json(500,{
            message:'internal server error'
        })

    }
   
}