import mongoose from 'mongoose'

const connectDatabase = async () => {
  const mongoDbUrl = process.env.MONGODB_URI
  if (!mongoDbUrl) {
    console.error('MONGODB_URI is not defined in the environment variables.')
    process.exit(1)
  }

  console.log(`Connecting to ${mongoDbUrl}`)
  mongoose.Promise = global.Promise

  try {
    await mongoose.connect(mongoDbUrl, {})
    console.log('Successfully connected to the database')
  } catch (err) {
    console.error(`Could not connect to the database. Exiting now...\n${err}`)
    process.exit(1)
  }
}

export default connectDatabase
