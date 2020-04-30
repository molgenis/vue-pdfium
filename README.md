# vue-pdfium

## Install

### Manual

> Node.js 13 or later is required (native ESM).

```bash
git@github.com:molgenis/vue-pdfium.git
cd vue-pdfium
yarn
cp .pdfrc.example .pdfrc
node src/service.js
```

### Docker

```bash
git@github.com:molgenis/vue-pdfium.git
cd vue-pdfium
docker build . -t vue-pdfium
docker container run -p 3000:3000 vue-pdfium
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
vim .pdfrc
# Fill state.json with the results of JSON.stringify(data).
# This allows you to develop with static state and GET requests.
cp state.json.example state.json
nodemon src/service.js
```

During development, open `/vuepdf-dev` in a Chrom(e/ium) browser and use
the [Livereload extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)
to watch the rendered PDF in the browser while you update your component & styling.
