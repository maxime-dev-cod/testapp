const jwt = require('jsonwebtoken')
const env = require('../env')

const JWT_SECRET = env('JWT_SECRET')

const generateToken = async (user) => {
   const { id, email } = user

   const token = jwt.sign(
      {
         id,
         email
      },
      JWT_SECRET,
      { expiresIn: '1d' },
   )
   const decodedToken = jwt.verify(token, JWT_SECRET)

   return {
      token,
      tokenExpiryDate: decodedToken.exp,
   }
}

const verifyToken = async (token) => {
   const decodedToken = jwt.verify(token, JWT_SECRET)

   return decodedToken
}

const isUserAuthenticated = async (req, res, next) => {
   const { authorization } = req.headers

   if (!authorization) return res.status(401).json({ message: 'Access token required' })

   if (!authorization.startsWith('Bearer')) return res.status(401).json({ message: 'invalid token' })

   const split = authorization.split('Bearer ')
   if (split.length !== 2) return res.status(401).json({ message: 'invalid token' })

   const token = split[1]

   try {
      const decodedToken = await verifyToken(token)

      res.locals.admin = decodedToken
      req.user = decodedToken

      return next()
   } catch (err) {
      if (err.message === 'invalid token') {
         return res.status(401).json({ message: 'invalid token' })
      } else if (err.message === 'invalid signature') {
         return res.status(401).json({ message: 'invalid signature' })
      } else if (err.message === 'jwt malformed') {
         return res.status(401).json({ message: 'jwt malformed' })
      } else if (err.message === 'jwt expired') {
         return res.status(401).json({ message: 'jwt expired' })
      }

      return res.status(400).json({ message: 'Unauthorized' })
   }
}

const authorizationMiddleware = async (req, res, next) => {
   try {
      // Do any authorization limits here

      return next()
   } catch (err) {
      return res.status(400).json({ message: 'Unauthorized' })
   }
}

module.exports = {
   generateToken,
   isUserAuthenticated,
   authorizationMiddleware,
   verifyToken,
}
