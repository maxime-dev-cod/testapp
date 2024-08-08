
const bcrypt = require('bcrypt')
const { insertData, readData, updateData } = require('./mongodb.actions.js')
const { generateToken, verifyToken } = require('../middleware/jwt.js')
const sendEmail = require('../utils/email.js')

const collections = {
   users: 'users',
   otp_s: 'otp_s',
}

const getUserByEmail = async (email) => {
   const user = await readData(collections.users, { email })
   return user
}

const signIn = async (req, res) => {
   try {
      const { email, password } = req.body
      if (!email) return res.status(400).send('Email is required')
      if (!password) return res.status(400).send('Password is required')

      const user = await getUserByEmail(email)

      if (user.length === 0) return res.send('User does not exist')

      const passwordMatch = await bcrypt.compare(password, user[0].password)
      if (!passwordMatch) {
         return res.status(400).json({ message: "Password doesn't match" })
      }

      const token = await generateToken({ id: user[0]._id, email: user[0].email })

      delete user[0].password
      return res.status(200).send({
         message: 'Signed in successfully',
         data: {
            ...user[0],
            ...token,
         },
      })
   } catch (error) {
      res.send('Could not sign in user')
   }
}

const signUp = async (req, res) => {
   try {
      const { email, password, name } = req.body

      if (!email) return res.status(400).send('Email is required')
      if (!password) return res.status(400).send('Password is required')
      if (!name) return res.status(400).send('Name is required')

      const userExists = await getUserByEmail(email)

      if (userExists.length > 0) {
         return res.send('User with similar details already exists. Please sign in.')
      }

      const hashedPassword = await bcrypt.hash(password, 10)


      await insertData(collections.users, {
         email,
         password: hashedPassword,
         name
      })


      const newUser = await readData(collections.users, { email })
      const token = await generateToken({ id: newUser[0].id, email: newUser[0].email })

      delete newUser[0].password

      return res.status(200).json({
         message: 'Signed up successfully',
         data: {
            ...newUser[0],
            ...token,
         },
      })
   } catch (error) {
      res.send('Could not register user')
   }
}

const verifyEmail = async (req, res) => {
   try {
      const { email, otp } = req.body

      if (!email) return res.status(400).send('Email is required')
      if (!otp) return res.status(400).send('OTP is required')

      const user = await getUserByEmail(email)

      if (user.length === 0) {
         res.send('User does not exist')
         return
      }

      const otpData = await readData(collections.otp_s, { email })

      if (otpData.length === 0) {
         res.send('Please request for a new OTP')
         return
      }

      const otpExists = otpData.filter((otpItem) => {
         const isExpired = (new Date() - new Date(otpItem.createdAt)) > (otpItem.expiresIn * 6000)
         return otpItem.otp === otp && !isExpired
   })

      if (otpExists.length === 0) {
         res.send('Invalid OTP')
         return
      }

      await updateData(collections.users, { email }, { isVerified: true })

      return res.status(200).json({
         message: 'Email verified successfully',
      })
   } catch (error) {
      res.send('Could not verify email')
   }
}

const emailVerificationOtp = async (req, res) => {
   try {
      const { email } = req.body

      if (!email) return res.status(400).send('Email is required')

      const user = await getUserByEmail(email)

      if (user.length === 0) {
         res.send('User does not exist')
         return
      }

      const otp = Math.floor(100000 + Math.random() * 900000)

      await insertData(collections.otp_s, { email, otp, createdAt: new Date(), expiresIn: 6 })


      const mail = {
         subject: 'Email Verification',
         email,
         message: `<h1>Email Verification</h1>
         <p>Your OTP is: ${otp}</p>`,
      }

      sendEmail(mail)

      return res.status(200).json({
         message: 'OTP has been sent to your email address',
      })
   } catch (error) {
      res.send('Could not send OTP')
   }
}

const getResetPasswordLink = async (req, res) => {
   try {
      const { email } = req.body

      if (!email) return res.status(400).send('Email is required')

      const user = await getUserByEmail(email)

      if (user.length === 0) {
         res.send('User does not exist')
         return
      }

      const token = await generateToken({ email: email })


      const mail = {
         subject: 'Password Reset',
         email,
         message: `<h1>Reset your password</h1>
         <p>Click the link below to reset your password</p>
         <a href="${process.env.WEB_BASE_URL}/reset-password/${token.token}">Reset Password</a>`,
      }

      sendEmail(mail)

      return res.status(200).json({
         message: 'If an account with this email exists, a password reset link will be sent to it',
      })
   } catch (error) {
      console.log(error)
      res.send('Could not reset password')
   }
}

const resetPassword = async (req, res) => {
   try {
      const { token, password } = req.body

      if (!token) return res.status(400).send('Token is required')
      if (!password) return res.status(400).send('Password is required')

      const decodedToken = await verifyToken(token)

      if (!decodedToken) {
         return res.status(400).send('Invalid token')
      }

      const { email } = decodedToken

      const user = await getUserByEmail(email)

      if (user.length === 0) {
         res.status(400).send('Please contact support for assistance')
         return
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      await updateData(collections.users, { email }, { password: hashedPassword })

      return res.status(200).json({
         message: 'Password reset successfully',
      })
   } catch (error) {
      res.send('Could not reset password')
   }
}

const updatePersonalInfo = async (req, res) => {
   try {

      const userId = req.user.id

      const user = await readData(collections.users, { _id: userId })

      if (user.length === 0) {
         res.send('User does not exist')
         return
      }

      await updateData(collections.users, { _id: userId }, { ...req.body})

      return res.status(200).json({
         message: 'Personal info updated successfully',
      })
   } catch (error) {
      res.send('Could not update personal info')
   }
}
const getPersonalInfo= async (req,res) => {
 
   try {
      const userId = req.user.id

      const user = await readData(collections.users, { _id: userId })
  
      if(user.length ){
         
         res.status(200).send(user)
      }
      else{
         res.status(400).send("User Not found")
      }
   } catch (error) {
      res.status(500).send(error.message)
   }

}

module.exports = {
   signIn,
   signUp,
   resetPassword,
   getResetPasswordLink,
   updatePersonalInfo,
   emailVerificationOtp,
   verifyEmail,
   getPersonalInfo
}
