import fs from 'fs-extra'
import path from 'path'
import {promisify} from 'util'
import Vue from 'vue'
import compiler from 'vue-template-compiler'
import HeadlessRender from 'vue-server-renderer'
import VueStash from 'vue-stash'

Vue.use(VueStash.default)
const render = HeadlessRender.createRenderer()
const renderToString = promisify(render.renderToString)

class VueRender {

    constructor(app) {
        this.app = app
    }

    async loadComponents() {
        this.app.logger.info(`[html] load components`)
        const ordersFile = await fs.readFile(path.join(this.app.settings.baseDir, 'src', 'components', 'orders.vue'), 'utf8')
        const component = (await import('./components/orders.js')).default(this.app)
        Object.assign(component, compiler.compileToFunctions(ordersFile, {
            preserveWhitespace: false,
        }))

        return component
    }


    async renderComponent(name, store) {
        // Make (part of) the settings available to the rendering context.
        Object.assign(store, {
            pdfium: {
                port: this.app.settings.port
            }
        })

        if (!this.component) {
            this.component = await this.loadComponents()
        } else if (this.app.settings.dev) {
            // Livereload always reloads template/component data.
            this.component = await this.loadComponents()
        }

        this.app.logger.info(`[html] render component ${name}`)
        this.vm = new Vue({data: {store}, render: h => h(this.component)})

        const html = await renderToString(this.vm)
        return html
    }

}

export default (app) => new VueRender(app)