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
        const ordersFile = await fs.readFile(path.join(this.app.settings.baseDir, 'components', 'orders.vue'), 'utf8')
        this.component = (await import('./components/orders.js')).default(this.app)
        Object.assign(this.component, compiler.compileToFunctions(ordersFile, {
            preserveWhitespace: false,
        }))

        console.log(this.component)
    }


    async renderComponent(name, state) {
        this.app.logger.info(`[html] render component ${name}`)
        this.vm = new Vue({
            data: {
                store: state
            },
            render: h => h(this.component),
        })


        const html = await renderToString(this.vm)
        return html
    }

}

export default (app) => new VueRender(app)