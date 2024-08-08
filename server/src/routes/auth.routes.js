const { Router } = require('express')
const authActions = require('../actions/auth.actions.js')
const { isUserAuthenticated } = require('../middleware/jwt.js')


const authRouter = Router()

authRouter.post('/signIn', authActions.signIn)
authRouter.post('/signUp', authActions.signUp)
authRouter.post('/verifyEmail', authActions.verifyEmail)
authRouter.post('/getEmailVerificationOtp', authActions.emailVerificationOtp)
authRouter.post('/get-reset-password-link', authActions.getResetPasswordLink)
authRouter.post('/resetPassword', authActions.resetPassword)
authRouter.post('/updatePersonalInfo', isUserAuthenticated, authActions.updatePersonalInfo)
authRouter.get('/personalInfo', isUserAuthenticated, authActions.getPersonalInfo)
module.exports = authRouter
