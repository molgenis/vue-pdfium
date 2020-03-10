class PdfRender {
    constructor(app) {
        this.app = app
        this.pool = app.pool
    }

    async html2pdf(htmlString) {
        const page = await this.pool.acquire()
        if (this.app.settings.dev) await page.setCacheEnabled(false)

        await page.setContent(htmlString)
        const buffer = await page.pdf({
            format: 'A4',
            margin: {
                bottom: 20,
                left: 20,
                right: 20,
                top: 20,
            },
            printBackground: true,
        })
        this.pool.release(page)
        return buffer
    }
}

export default (app) => new PdfRender(app)