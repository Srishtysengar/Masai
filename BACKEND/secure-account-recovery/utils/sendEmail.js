const nodemailer = require("nodemailer");

const sendEmail = async (options)=>{
    const testAccount = await nodemailer.createTestAccount();

    const Transporter = nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: '"Secure Recovery API" <no-reply@secureapi.com>',
        to: options.to,
        subject:options.subject,
        text:options.message,
    };

    const info = await Transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    console.log("preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = sendEmail;