var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const creds = require('./config');

const transport = {
    host: 'smtp.gmail.com',
    auth: {
        user: creds.USER,
        pass: creds.PASS
    }
};

const transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});

router.post('/send', (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const country = req.body.country;
    const message = req.body.message;
    const phone = req.body.phone;
    const content = ` Name: ${name} \n Email: ${email} \n Phone: ${phone} \n Country: ${country} \n Message: ${message} `;

    const attachments = [{
        filename: req.body.fileName,
        content: req.body.fileContent,
        encoding: 'base64'
    }];

    const mail = {
        from: name,
        to: 'daniel@puls-software.com',
        subject: 'New Message from Contact Form',
        text: content,
        attachments: req.body.fileContent ? attachments : null
    };

    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json({
                msg: 'fail'
            })
        } else {
            res.json({
                msg: 'success'
            })
        }
    });
    transporter.close()
});

module.exports = router;