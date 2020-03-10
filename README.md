# vue-pdfium

This is a fast HTML to PDF rendering service with a builtin Vue renderer.
Its purpose is to provide a flexible PDF renderer for client-side Vue
applications, by relying on application state and ServerSide Rendered
Vue components.

## Install
```bash
git@github.com:molgenis/vue-pdfium.git
cd vue-pdfium
yarn
cp vue-pdfiumrc.example vue-pdfiumrc
```

Simply POST the component name to render and its state:

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

```html
/vuepdf
/vuepdf-dev
```

Send state, render a Vue component PDF rendering service

## Install
