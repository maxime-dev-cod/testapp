const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const env = require('../env')

const MONGODB_DATABASE = env('MONGODB_DATABASE')
const MONGO_DB_USER_NAME = env('MONGO_DB_USER_NAME')
const MONGO_DB_PASSWORD = env('MONGO_DB_PASSWORD')

const uri = `mongodb+srv://${MONGO_DB_USER_NAME}:${MONGO_DB_PASSWORD}@cluster0.oskm5fm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const client = new MongoClient(uri, {
   serverApi: ServerApiVersion.latest,
   ssl: true,

})

client
   .connect()
   .then(() => console.log('MongoDB Connected with x509 authentication over TLS'))
   .catch((err) => console.error('Error connecting to MongoDB with x509 over TLS:', err))

// Select the database
const db = client.db(MONGODB_DATABASE)

db.collection('financial_accounts').createIndex({ userId: 1 })

const createMissingCollections = async (requiredCollections) => {
   try {
      console.log('Creating missing collections...')
      for (const collectionName of requiredCollections) {
         // Check if the collection already exists
         const collections = await db.listCollections({ name: collectionName }).toArray()

         if (collections.length === 0) {
            // Create the collection if it doesn't exist
            await db.createCollection(collectionName)
            console.log(`Collection "${collectionName}" created.`)
         }
      }
      console.log('Done creating missing collections.')
      return
   } catch (error) {
      throw new Error(error)
   }
}

// Insert data into a collection
const insertData = async (collectionName, data) => {
   try {
      const collection = db.collection(collectionName)

      const result = await collection.insertOne(data)

      console.log(`Inserted ${result.insertedCount} document into ${collectionName}`)
      return true
   } catch (error) {
      console.log(error)
      return false
   }
}

// Update data in a collection
const updateData = async (collectionName, query, update) => {
   try {
      const collection = db.collection(collectionName)

      if (query._id) {
         query._id = new ObjectId(query._id)
      }

      const result = await collection.updateOne(query, { $set: update })
      console.log(
         `Matched ${result.matchedCount} document and modified ${result.modifiedCount} document in ${collectionName}`,
      )
      return true
   } catch (error) {
      console.log(error)
      return false
   }
}
// 

const deleteAccount = async (collectionName, query) => {
   try {
      const collection = db.collection(collectionName)

      if (query._id) {
         query._id = new ObjectId(query._id)
      }

      const result = await collection.deleteOne(query)
      console.log(
         `Deleted ${result.deletedCount} document(s) from ${collectionName}`,
      )
      return true
   } catch (error) {
      console.log(error)
      return false
   }
}


// Read data from a collection
const readData = async (collectionName, query) => {
   try {
      const collection = db.collection(collectionName)

      if (query._id) {
         query._id = new ObjectId(query._id)
      }

      const data = await collection.find(query).toArray()

      return data
   } catch (error) {
      console.log(error)
      return []
   }
}

module.exports = {
   insertData,
   updateData,
   readData,
   deleteAccount,
   createMissingCollections,
   db,
}
