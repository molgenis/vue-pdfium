import {__dirname} from './utils.js'
import bodyParser from 'body-parser'
import express from 'express'
import logger from './logger.js'
import PdfRender from './pdf-render.js'
import Pool from './pool.js'
import rc from 'rc'
import validators from './schema.js'
import VueRender from './vue-render.js'

import tinylr from 'tiny-lr'

tinylr().listen(35729, function() {
    console.log('... tinylr listening');
})

const app = {logger}

function errorHandler(err, req, res, next) {
    res.status(400).json({ error: err })
}

app.settings = rc('pdf-generator', {
    baseDir: __dirname,
    headless: true,
    pool: {
        max: 10,
        min: 3,
        process: 1,
    },
    port: 3000,
})

app.express = express()
app.express.use(bodyParser.json())

app.express.post('/html2pdf', async function(req, res, next) {
    const validated = validators.html2pdf.validate(req.body)
    if (validated.error) return next(validated.error)

    const parsed = validated.value
    let buffer = await app.pdf.html2pdf(parsed.html)

    res.set('Content-Type', 'application/pdf')
    res.send(buffer)
})

app.express.post('/vue2pdf', async function(req, res, next) {
    const validated = validators.vue2pdf.validate(req.body)
    if (validated.error) return next(validated.error)

    const parsed = validated.value

    const html = await app.vue.renderComponent(parsed.component, parsed.state)
    let buffer = await app.pdf.html2pdf(html)

    res.set('Content-Type', 'application/pdf')
    res.send(buffer)
})

/**
 * Use from a browser during development makes
 * it easier to iterate quickly.
 */
app.express.get('/vue2pdf-dev', async function(req, res, next) {
    const state = {
        component: 'orders',
        state: {
            orders: [
                {id: 1, name: 'order 1'},
                {id: 2, name: 'order 2'},
                {id: 3, name: 'order 3'},
                {id: 4, name: 'order 4'},
                {id: 5, name: 'order 5'},
            ],
        },
    }

    const html = await app.vue.renderComponent(state.component, state.state)
    let buffer = await app.pdf.html2pdf(html)

    res.set('Content-Type', 'application/pdf')
    res.send(buffer)
})


app.express.use(errorHandler)

app.express.listen(app.settings.port, async() => {
    app.logger.info(`[service] started on port ${app.settings.port}`)
    app.pool = await Pool(app)
    app.vue = VueRender(app)
    await app.vue.loadComponents()
    app.pdf = PdfRender(app)
})

