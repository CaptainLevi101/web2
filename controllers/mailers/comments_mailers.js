const nodemailer = require('../../config/nodemailer');

exports.newComment=(comment)=>{
//   let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comments.ejs');
//   console.log(htmlString);
    nodemailer.transporter.sendMail({
        from:'ashishparashardmp@gmail.com',
        to:comment.user.email,
        subject:'New Comment',
        html:'<h1>cool</h1>'
    },(err,info)=>{
        if(err){
            console.log('error in sending Mail',err);
            return;
        }
        console.log('message sent',info);
    })
}