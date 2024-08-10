import * as dotenv from 'dotenv'
import path from 'path'
import winston from 'winston'

dotenv.config()
class Logger {
  public logger() {
    const date = new Date()
    const dateLog = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    const logPath = String(process.env.PATH_LOG)
    return winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.colorize(),
        winston.format.printf((log) => {
          if (log.stack) return `[${log.timestamp}] [${log.level}] ${log.stack}`
          return `[${log.timestamp}] [${log.level}] ${log.message}`
        })
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: path.join(logPath, `details.${dateLog}.log`)
        }),
        new winston.transports.File({
          level: 'info',
          filename: path.join(logPath, `info.${dateLog}.log`)
        }),
        new winston.transports.File({
          level: 'error',
          filename: path.join(logPath, `errors.${dateLog}.log`)
        })
      ]
    })
  }
}

export default new Logger().logger()
