import cors from 'cors'
import * as dotenv from 'dotenv'
import express, { Application, Request, Response } from 'express'
import logger from './helpers/logger'
import cookieParser from 'cookie-parser'
import connectDatabase from './configs/database'
import compression from 'compression'
dotenv.config()
const app = express()
const port = process.env.PORT || 3333
const host = process.env.HOST || 'localhost'

/** Connect to database */
connectDatabase()

/** Middlewares */
app.use(cors())
app.use(cookieParser())
app.use(compression())

/** Start server */
app.listen(port, () => {
  console.info(`🚀 Server running on: http://${host}:${port}`)
})
