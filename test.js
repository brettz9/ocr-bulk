'use strict';

const {join} = require('path');
const ot = require('./index'); // require('ocr-bulk');

ot.writeFile({
  start: 1,
  end: 3,
  outputPath: join(__dirname, 'ocr.txt'),
  getImagePath (i) {
    return 'C:\\Users\\Brett\\Documents\\images\\image-' + ot.pad(i, 4) +
      '.jpg';
  },
  concatenater (text, i) {
    // eslint-disable-next-line no-console
    console.log('Finishing ' + i);
    return '\n\n{{page|' + i + '}}\n\n' + text;
  },
  done () {
    // eslint-disable-next-line no-console
    console.log('Saved!');
  }
});
