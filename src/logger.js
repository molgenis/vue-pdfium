import 'winston-daily-rotate-file'
import winston from 'winston'

const logFormat = winston.format.printf(info => {
    return `${info.timestamp} [${info.level}] ${info.message}`
})

var rotateLogger = new (winston.transports.DailyRotateFile)({
    datePattern: 'YYYY-MM-DD-HH',
    filename: 'logs/vue-pdfium-%DATE%.log',
    format: winston.format.combine(
        winston.format.timestamp(),
        logFormat,
    ),
    maxFiles: '14d',
    maxSize: '20m',
    zippedArchive: true,
});


const logger = winston.createLogger({
    defaultMeta: { service: 'user-service' },
    format: winston.format.json(),
    level: 'info',
    transports: [rotateLogger],
})

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            logFormat,
        ),
    }))
}

export default logger