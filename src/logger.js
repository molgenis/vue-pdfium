import winston from 'winston'
import 'winston-daily-rotate-file'

const logFormat = winston.format.printf(info => {
    return `${info.timestamp} [${info.level}] ${info.message}`
})

var rotateLogger = new (winston.transports.DailyRotateFile)({
    filename: 'logs/pdf-generator-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    format: winston.format.combine(
        winston.format.timestamp(),
        logFormat
    ),
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
  });


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [rotateLogger]
})

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            logFormat
          )
    }))
}

export default logger