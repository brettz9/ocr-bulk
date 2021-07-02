'use strict';

const volume = process.argv[2] || '';
const offset = process.argv[3];
const skip = false;

const {join} = require('path');
const ot = require('../index'); // require('ocr-bulk');

ot.writeFile({
  start: 1,
  end: 14,
  outputPath: join(__dirname, 'ocr-' + volume + '.html'),
  getImagePath (i) {
    return '/Users/brett/Downloads/' +
      ot.pad(i, 4) + '.jpg';
  },
  concatenater (text, i) {
    // eslint-disable-next-line no-console
    console.log('Finishing ' + i);
    return '\n\n<a id="pg' +
      (skip ? '' : (i + (offset ? parseInt(offset) : 0))) +
      '"></a>\n\n' + text;
  },
  done () {
    // eslint-disable-next-line no-console
    console.log('Saved!');
  }
});
