import 'winston-daily-rotate-file'
import winston from 'winston'

var rotateLogger = new (winston.transports.DailyRotateFile)({
    datePattern: 'YYYY-MM-DD-HH',
    filename: 'logs/vue-pdfium-%DATE%.log',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => {
            // Preferred logging format for Kibana.
            return `${info.timestamp} [${info.level.toUpperCase()}] ${info.message}`
        }),
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
            winston.format.printf(info => {
                return `[${info.level}] ${info.message}`
            }),
        ),
    }))
}

export default logger