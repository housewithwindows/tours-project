const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

dotenv.config()

const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        pass: process.env.EMAIL_PASS,
        user: process.env.EMAIL_USER
    }
})

const sendEmail = async (to,subject,html) => {
    try{
        await transporter.sendMail({
            from: 'Chatbook:<chatbookOfficial@gmail.com>',
            to,
            subject,
            html 
        })
    }
    catch(err){
        console.error('error occured',err)
    } 
}

module.exports = sendEmail