# ocr-bulk

For performing OCR recognition on images.

# Installation

1. Install [node-tesseract](https://github.com/tesseract-ocr/tesseract) (e.g., the [Windows installer](https://code.google.com/p/tesseract-ocr/downloads/detail?name=tesseract-ocr-setup-3.02.02.exe&can=2&q=)).
1. `npm install ocr-bulk`

# Example

```js
var ot = require('ocr-bulk');
ot.writeFile({
    start: 1,
    end: 3,
    outputPath: __dirname + '/ocr.txt',
    getImagePath: function (i) {
        return 'C:\\Users\\Brett\\Documents\\images\\image-' + ot.pad(i, 4) + '.jpg';
    },
    concatenater: function (text, i) {
        console.log('Finishing ' + i);
        return '\n\n{{page|' + i + '}}\n\n' + text;
    },
    done: function () {
        console.log('Saved!');
    }
});
```
# Usage

## Methods

- `writeFile({start: ..., end: ..., getImagePath: cb(i), readErrback: cb(err), outputPath: ..., concatenater: cb(text, i), done: cb()})` - This method will concatenate results based on the supplied arguments and output into a single file. Passed a single config object whose `start` property indicates a number at which to begin reading images (defaults to `1`) and `end` is a required ending number. `getImagePath` is a required callback which is passed the current iteration number and should be used to return an image path. `readErrback` is an optional errback which will be passed the file read error if one occurs. `outputPath` is a required string indicating the desired path to which to write the concatenated contents. `concatenater` is a callback which will be called with the OCR'd text and the current iteration count. It should return the value to be appended to any previously concatenated values (starting with an empty string). `done` is an optional callback which will be called upon completion of appending OCR for all read files (those between the supplied start and end points).
- `readOCR({start: ..., end: ..., getImagePath: cb(i), readErrback: cb(err), processor: cb(text, i), done: cb()})` - Passed a single config object whose `start` property indicates a number at which to begin reading images (defaults to `1`) and `end` is a required ending number. `getImagePath` is a required callback which is passed the current iteration number and should be used to return an image path. `readErrback` is an optional errback which will be passed the file read error if one occurs. `processor` is a required callback argument which receives the current OCR'd text and the current iteration number as arguments. `done` is an optional callback which will be called upon completion of reading all files between the supplied start and end points.
- `pad(val, len, chr)` - A utility intended for use by `getImagePath` to add padding in retrieval of predictable image path inputs. The required `val` is the value to be padded, the required `len` indicates the desired total length including padding, and `chr` is an optional character to be used for padding (defaults to "0").

# Todos

1. Add methods for zipping results and make a server with web app
1. Add [node-imagemagick](https://github.com/yourdeveloper/node-imagemagick) or [node-imagemagick-native](https://github.com/mash/node-imagemagick-native) dependency for [converting PDFs](http://kiirani.com/2013/03/22/tesseract-pdf.html).
1. Note: Could use http://manuels.github.io/unix-toolbox.js/ for client-side conversion, esp. if Tesseract could ever be
[converted to asm.js](https://github.com/tesseract-ocr/tesseract/issues/75).
