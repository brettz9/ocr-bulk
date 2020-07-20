# ocr-bulk

Perform OCR recognition on multiple images.

**Note that this doesn't currently contain a normal functioning binary and needs
adapting of source.**

## Installation

1. Install [tesseract](https://github.com/tesseract-ocr/tesseract) (e.g., the [Windows installer](https://code.google.com/p/tesseract-ocr/downloads/detail?name=tesseract-ocr-setup-3.02.02.exe&can=2&q=)).
1. `npm i -D ocr-bulk` (for development use) or `npm i -P ocr-bulk` (for production use)

For PDF conversion support:

1. Follow the brew install instructions at <https://github.com/aheckmann/gm#getting-started>.
1. I also needed `brew install ghostscript`

## Example

```js
'use strict';
const {join} = require('path');
const ot = require('ocr-bulk');

(async () => {
await ot.writeFile({
  start: 1,
  end: 3,
  outputPath: join(__dirname, 'ocr.txt'),
  getImagePath (i) {
    return `C:\\Users\\Brett\\Documents\\images\\image-${ot.pad(i, 4)}.jpg`;
  },
  concatenater (text, i) {
    // eslint-disable-next-line no-console
    console.log('Finishing ' + i);
    return `\n\n{{page|${i}}}\n\n${text}`;
  }
});
// eslint-disable-next-line no-console
console.log('Saved!');
})();
```

## Usage

### Methods

- `writeFile({start: ..., end: ..., getImagePath: cb(i), readErrback: cb(err), outputPath: ..., concatenater: cb(text, i), tesseractOptions: {}, done: cb()})` - This method will concatenate results based on the supplied arguments and output into a single file. Passed a single config object whose `start` property indicates a number at which to begin reading images (defaults to `1`) and `end` is a required ending number. `getImagePath` is a required callback which is passed the current iteration number and should be used to return an image path. `readErrback` is an optional errback which will be passed the file read error if one occurs. `outputPath` is a required string indicating the desired path to which to write the concatenated contents. `concatenater` is a callback which will be called with the OCR'd text and the current iteration count. It should return the value to be appended to any previously concatenated values (starting with an empty string). `done` is an optional callback which will be called upon completion of appending OCR for all read files (those between the supplied start and end points); the `Promise` returned from `writeFile` can be used for the same purpose.
- `readOCR({start: ..., end: ..., getImagePath: cb(i), readErrback: cb(err), processor: cb(text, i), tesseractOptions: {}, done: cb()})` - Passed a single config object whose `start` property indicates a number at which to begin reading images (defaults to `1`) and `end` is a required ending number. `getImagePath` is a required callback which is passed the current iteration number and should be used to return an image path. `readErrback` is an optional errback which will be passed the file read error if one occurs. `processor` is a required callback argument which receives the current OCR'd text and the current iteration number as arguments. `done` is an optional callback which will be called upon completion of reading all files between the supplied start and end points; the `Promise` returned from `writeFile` can be used for the same purpose.
- `pad(val, len, chr)` - A utility intended for use by `getImagePath` to add padding in retrieval of predictable image path inputs. The required `val` is the value to be padded, the required `len` indicates the desired total length including padding, and `chr` is an optional character to be used for padding (defaults to "0").

## Todos

1. Make as binary with flag to pass in (JavaScript) config file
1. Add methods for zipping results and make a server with web app
1. Could use [tesseract.js](https://github.com/naptha/tesseract.js) for
    client-side conversion
1. For imagemagick, could use <http://manuels.github.io/unix-toolbox.js/>.
1. See also <https://github.com/zapolnoch/node-tesseract-ocr>.
