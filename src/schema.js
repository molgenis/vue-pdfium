import Joi from '@hapi/joi'

export default {
    html2pdf: Joi.object({
        html: Joi.string().required(),
        // Add options from https://github.com/puppeteer/puppeteer/blob/v2.1.1/docs/api.md#pagepdfoptions
        // where appropriate:
        options: Joi.object({
            format: Joi.string().default('Letter'),
            landscape: Joi.boolean().default(false).required(),
            pageRanges: Joi.string().default('').required(),
            scale: Joi.number().default(1).required(),
        }),
    }),
    vue2pdf: Joi.object({
        component: Joi.string().required(),
        state: Joi.object(),
    }),
}
