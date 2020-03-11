# vue-pdfium

[Puppeteer](https://github.com/puppeteer/puppeteer) is a powerful way
to control a headless Chromium instance using the DevTools protocol.
Chromium uses [Pdfium](https://opensource.google/projects/pdfium) to render
PDFs from HTML. Pdfium deals with the nitty-gritty details of converting
HTML & CSS to a similar-looking PDF file. Puppeteer offers an [API method](https://github.com/puppeteer/puppeteer/blob/v2.1.1/docs/api.md#pagepdfoptions) to generate a
PDF through this stack.

Vue-pdfium combines Puppeteer and Vue in a Node application. A Vue browser
application only has to send state to the `/vuepdf` endpoint. The endpoint
renders a specified component on the server as HTML and responds with the
generated PDF.

Compared to manual navigation with Puppeteer(using .goto), this approach is
faster and offers more control over the eventual layout of the rendered PDF.

## Install

### Manual

> Node.js 13+ is required (native ESM).

```bash
git@github.com:molgenis/vue-pdfium.git
cd vue-pdfium
yarn
cp vue-pdfiumrc.example vue-pdfiumrc
node src/service.js
```

### Docker

```bash
git@github.com:molgenis/vue-pdfium.git
cd vue-pdfium
docker build . -t vue-pdfium
docker container run -p 3000:3000 vue-pdfium
# Or land in a shell with:
docker run -it -p 3000:3000 vue-pdfium bash
```

## Usage

POST the component name to render and its state to `/vuepdf`:

```javascript
import axios from 'axios'
// We could have used URL.createObjectURL manually, but
// this library takes care of IE/Safari edge cases as well.
import fileDownload from 'js-file-download'

const res = await axios({
    method: 'POST',
    url: '/vuepdf',
    responseType: 'blob',
    data: {
        component: 'orders',
        state
    }
})

fileDownload(res.data, 'mypdf.pdf', 'application/pdf')
```

### Development

```bash
# Set `dev` to true, which autoreloads components on every request.
vim .vue-pdfiumrc
# Fill state.json with the results of JSON.stringify(data).
# This allows you to develop with static state and GET requests.
cp state.json.example state.json
nodemon src/service.js
```

During development, open `/vuepdf-dev` in a Chrom(e/ium) browser and use
the [Livereload extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)
to watch the rendered PDF in the browser while you update your component & styling.
