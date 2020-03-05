import genericPool from 'generic-pool'
import puppeteer from 'puppeteer'

export default async function init(app) {

    const factory = function(browsers) {
        let divider = 0
        return {
            create: function() {
                divider = divider % (browsers.length)
                app.logger.info(`[pool] new browser page from process ${divider}`)
                const launchedPage = browsers[divider].newPage()
                divider += 1
                return launchedPage
            },
            destroy: function(page) {
                app.logger.info(`[pool] release page`)
                page.close()
            },
        }
    }

    const browsers = []
    for (let i = 0; i < app.settings.pool.process; i++) {
        const browser = await puppeteer.launch({
            headless: app.settings.headless,
        })
        browsers.push(browser)
    }
    app.logger.info(`[pool] start with ${browsers.length} browser processes`)
    return genericPool.createPool(factory(browsers), app.settings.pool)
}