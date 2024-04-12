var nodemailer = require('nodemailer');

const email = "noreply.healthytouch@gmail.com"
const pass = "lnqx ykod ncro udhp"


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: pass
    }
});

const sendNewPasswordMail = async (name, toEmail, password) => {

    var mailOptions = {
        from: email,
        to: toEmail,
        subject: "Welcome to Jobify",
        html: `<h3>Hello ${name}</h3><br>

        Your account password token is <b> ${password} </b>
        <br><br>


        Thanks,
        <br>
        Team.` // the tick should come here
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

const validateEmail = (email) => {
    var validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    console.log(email);
    return validRegex.test(email);
}

module.exports = { sendNewPasswordMail, validateEmail }