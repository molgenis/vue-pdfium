#!/usr/bin/env node
import {__dirname} from './utils.js'
import bodyParser from 'body-parser'
import chokidar from 'chokidar'
import delay from 'delay'
import express from 'express'
import fs from 'fs-extra'
import lightship from 'lightship'
import logger from './logger.js'
import mount from 'connect-mount'
import path from 'path'
import PdfRender from './pdf-render.js'
import Pool from './pool.js'
import rc from 'rc'
import serveStatic from 'serve-static'
import tinylr from 'tiny-lr'
import validators from './schema.js'
import VueRender from './vue-render.js'

const app = {logger}

const settings = app.settings = rc('pdf', {
    baseDir: path.join(__dirname, '../'),
    dev: false,
    headless: true,
    health: true,
    pool: {
        idleTimeoutMillis: 3000,
        max: 3,
        min: 1,
        process: 1,
    },
    port: 3000,
    postLimit: '10mb',
})

app.logger.info(`[service] dev mode: ${settings.dev}`)

app.express = express()
app.express.use(bodyParser.json({limit: settings.postLimit}))

app.express.use(mount('/static', serveStatic(path.join(settings.baseDir, 'static'))))

app.express.post('/vuepdf', async function(req, res, next) {
    const validated = validators.vue2pdf.validate(req.body)
    if (validated.error) return next(validated.error)

    const parsed = validated.value
    let buffer, html
    try {
        html = await app.vue.renderComponent(parsed.component, parsed.state)
        buffer = await app.pdf.html2pdf(html)
    } catch (err) {
        app.logger.error(err.stack)
        return next(err)
    }

    res.set('Content-Type', 'application/pdf')
    res.send(buffer)
})

/**
 * Use from a browser during development makes
 * it easier to iterate quickly.
 */
if (app.settings.dev) {
    app.express.get('/vuepdf-dev', async function(req, res, next) {
        let buffer, html
        try {
            const state = JSON.parse((await fs.readFile(path.join(app.settings.baseDir, 'state.json'), 'utf8')))
            html = await app.vue.renderComponent('orders', state)
            buffer = await app.pdf.html2pdf(html)
        } catch (err) {
            app.logger.error(err.stack)
            return next(err)
        }

        res.set('Content-Type', 'application/pdf')
        res.send(buffer)
    })
}

// Simple error handler.
app.express.use((err, req, res, next) => {// eslint-disable-line no-unused-vars
    res.status(400).json({ error: err })
})

const server = app.express.listen(app.settings.port, async() => {
    app.logger.info(`[service] started on port ${app.settings.port}`)
    app.pool = await Pool(app)
    app.vue = VueRender(app)
    app.pdf = PdfRender(app)

    if (app.settings.health) {
        app.lightship.signalReady()
    }
})

if (app.settings.health) {
    app.lightship = lightship.createLightship({ detectKubernetes: false })
    app.lightship.registerShutdownHandler(async() => {
        app.logger.info('[service] shut down')
        await delay(60 * 1000)
        server.close()
    })
}


app.onExit = async function() {
    if (app.pool) {
        try {
            await app.pool.drain()
            app.pool.clear()
        } catch (err) {
            console.log(err)
        }
    }
}

process.on('exit', app.onExit.bind(null,{cleanup:true}))
process.on('SIGINT', app.onExit.bind(null, {exit:true}))

if (app.settings.dev) {
    tinylr().listen(35729, function() {
        app.logger.debug('[service] liveload development service started')
    })

    chokidar.watch([
        path.join(app.settings.baseDir, 'src', 'components', '*.vue'),
        path.join(app.settings.baseDir, 'static', '*.css'),
    ]).on('change', async() => {
        tinylr.changed('app.js')
    })
}

