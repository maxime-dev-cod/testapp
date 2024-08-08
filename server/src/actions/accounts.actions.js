const { insertData, readData, updateData,deleteAccount } = require('./mongodb.actions.js')

const createAccount = async (req, res) => {
  try {
    const { name, amount } = req.body

    if (!name) {
      return res.status(400).send('Name is required')
    }

    if(!amount) {
      return res.status(400).send('Amount is required')
    }

    const data = {
      userId: req.user.id,
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await insertData('financial_accounts', data)

    if (result) {
      return res.status(201).send('Account created successfully')
    }

    return res.status(400).send('Error creating account: ', result)
      
  } catch (error) {
    return res.status(500).send(error.message)
  }
}


const getUserAccounts = async (req, res) => {
  try {
    const accounts = await readData('financial_accounts', { userId: req.user.id })

    return res.status(200).send(accounts)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const updateUserAccount = async (req, res) => {
  try {

    delete req.body._id
    req.body.updatedAt = new Date()
    
    const result = await updateData('financial_accounts', { userId: req.user.id }, req.body)

    if (!result) {
      return res.status(400).send('Error updating account')
    }

    return res.status(200).send('Account updated successfully')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
const deleteUserAccount = async (req, res) => {
  try {

    // delete req.body._id
    req.body.updatedAt = new Date()
    const result = await deleteAccount('financial_accounts', { _id: req.body.id }, req.body)

    if (!result) {
      return res.status(400).send('Error deleting account')
    }

    return res.status(200).send('Account deleted successfully')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
   createAccount,
   getUserAccounts,
   updateUserAccount,
   deleteUserAccount
}