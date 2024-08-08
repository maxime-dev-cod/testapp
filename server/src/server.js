require('dotenv/config.js')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongo = require('./actions/mongodb.actions.js')
const routes = require('./routes')
const collections = require('./utils/collections.js')
const env = require('./env')

const PORT = parseInt(env('PORT')) || 2020

;(async () => {
   const app = express()
   app.use(cors())

   app.use(express.json())
   app.use(express.urlencoded({ extended: true }))

   app.use(cookieParser())

   await mongo.createMissingCollections(collections)


   app.use('/api/v1/auth', routes.authRouter)
   app.use('/api/v1/accounts', routes.accountRouter)

   app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})()
