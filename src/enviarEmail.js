
  var nodemailer = require("nodemailer");
  const nodemailMailgun = require('nodemailer-mailgun-transport');

 const auth = {
    auth: {

        api_key:'5d49e3f3c6107b45b804d4f6cec9f21e-6e0fd3a4-cf72c786',
        domain:'sandbox7b66320e7dc2420fb86a0f12e8d7d7bf.mailgun.org'
    }

 };


var transporter = nodemailer.createTransport(nodemailMailgun(auth));





function enviarLinkReset(email,id){
  

    const  mailOptions = {

        from: 'remitente <diegodelias@gmail.com>',
        to:email,
        subject:"Enviado desdeInstrucciones reseteo password",
        text: `Para resetear tu password, por favor hace click en este link: http://localhost:3000/reset/${id}`
    }
    
    

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });






    
    


}

module.exports = enviarLinkReset;