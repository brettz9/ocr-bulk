'use strict';

const {join} = require('path');
const ot = require('../index'); // require('ocr-bulk');

(async () => {
await ot.writeFile({
  encoding: null,
  start: 1,
  end: 1,
  tesseractOptions: {
    pdf: true
  },
  outputPath: join(__dirname, 'ocr-bayan.pdf'),
  getImagePath (i) {
    return join(__dirname, 'bab_bayan_arabic_terry.jpg');
  },
  concatenater (text, i) {
    // eslint-disable-next-line no-console
    console.log('Finishing ' + i);
    return text; // `[[[PAGE ${i}]]]\n\n` + text;
  }
});

// eslint-disable-next-line no-console
console.log('Saved!');
})();
