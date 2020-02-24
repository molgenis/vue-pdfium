class Pdf {
    constructor(app) {
        this.pool = app.pool
    }

    async htmlToPdf(htmlString) {
        const page = await this.pool.acquire()
        await page.setContent(html)
        const buffer = await page.pdf({})
        this.pool.release(page)
        return buffer
    }

    async urlToPdf(url) {
        try {
            const page = await this.pool.acquire()
            await page.goto(url, { waitUntil: 'networkidle0' })

            await page.waitForFunction(
                'document.querySelector("body").innerText.includes("Education")',
            );

            await page.click('#tree-component .row')
            await page.click('#tree-component li + div li')
            await page.waitForSelector('.grid-table tr')
            await page.addStyleTag({url: 'http://example.com/style.css'})
            const dom = await page.$eval('.grid-table', (element) => {
                return element.innerHTML
            })

            page.setContent(dom)
            const buffer = await page.pdf({})
            this.pool.release(page)
            return buffer
        } catch (err) {
            console.log(err)
        }
    }
}

export default (app) => new Pdf(app)