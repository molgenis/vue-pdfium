class PdfRender {
    constructor(app) {
        this.pool = app.pool
    }

    async html2pdf(htmlString) {
        const page = await this.pool.acquire()
        await page.setContent(htmlString)
        const buffer = await page.pdf({
            format: 'A4',
            printBackground: true,
        })
        this.pool.release(page)
        return buffer
    }
}

export default (app) => new PdfRender(app)