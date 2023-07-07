const nodemailer = require('nodemailer');
const path = require('path');


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    secureConnection: false,
    auth: {
        user: 'ashishparashardmp@gmail.com',
        pass: 'cdfxutwenodfgygx'
    },
    tls: {
        rejectUnauthorized: true,
    }
});

const renderTemplate = (data, relativePath) => {
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err,template){
            if (err) {
                console.log("Error in rendering page", err);
                return;
            }
            mailHtml = template;
        }
    );
    return mailHtml;
};

module.exports = {
    transporter,
    renderTemplate
};
