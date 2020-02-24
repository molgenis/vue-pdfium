import express from 'express'
import rc from 'rc'
import logger from './logger.js'

import {pdf2Html} from './schema.js'
import bodyParser from 'body-parser'

import initPool from './pool.js'
import initPdf from './pdf.js'


const app = {logger}

function errorHandler (err, req, res, next) {
    res.status(400).json({ error: err })
}

app.settings = rc('pdf-generator', {
    headless: true,
    port: 3000,
    pool: {
        process: 1,
        max: 10,
        min: 3
    }
})

app.express = express()
app.express.use(bodyParser.json())
app.express.post('/html2pdf', async function (req, res, next) {
    const validated = pdf2Html.validate(req.body)

    if (validated.error) {
        next(validated.error)
    } else {
        const parsed = validated.value
        let buffer
        if (parsed.html) {
            buffer = await app.pdf.htmlToPdf(parsed.html)
        } else if (parsed.url) {
            buffer = await app.pdf.urlToPdf(parsed.url)
        }

        res.set('Content-Type', 'application/pdf')
        res.send(buffer)
    }

})
app.express.use(errorHandler)

app.express.listen(app.settings.port, async () => {
    app.logger.info(`[service] started on port ${app.settings.port}`)
    app.pool = await initPool(app)
    app.pdf = initPdf(app)
})

