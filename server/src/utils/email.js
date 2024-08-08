const nodemailer = require('nodemailer')

const sendEmail = async (options) => {
   const emailPassword = process.env.EMAIL_PASSWORD;
   const emailName=process.env.EMAIL_USERNAME
// Use the emailPassword variable

   try {
      // 1) Create a transporter
      const transporter = nodemailer.createTransport({
         host: 'smtp.gmail.com',
         name: 'smtp.gmail.com',
         port: 587,
         secure: false, // true for 465, false for other ports
         auth: {
            user: emailName,
            pass:emailPassword,
         },
      })

      const mailOptions = {
         from: emailName,
         to: options.email,
         subject: options.subject,
         text: options.message,
      }

      console.log(mailOptions)

      await transporter.sendMail(mailOptions)
   } catch (error) {
      console.log(error)
   }

}

module.exports = sendEmail
