const { Router } = require('express')
const accountActions = require('../actions/accounts.actions.js')
const { isUserAuthenticated } = require('../middleware/jwt.js')

const accountRouter = Router()

accountRouter.post('/create', isUserAuthenticated, accountActions.createAccount)
accountRouter.get('/getUserAccounts', isUserAuthenticated, accountActions.getUserAccounts)
accountRouter.post('/deleteAccount', isUserAuthenticated, accountActions.deleteUserAccount)
accountRouter.post('/updateUserAccounts', isUserAuthenticated, accountActions.updateUserAccount)

module.exports = accountRouter
