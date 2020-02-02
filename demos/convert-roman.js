'use strict';

const volume = process.argv[2];
// const offset = process.argv[3];
const skip = false;

const {join} = require('path');
const {toRoman} = require('roman-numerals');

const ot = require('../index'); // require('ocr-bulk');

ot.writeFile({
  start: 1,
  end: 15,
  outputPath: join(__dirname, 'ocr-' + volume + '.txt'),
  getImagePath (i) {
    return 'C:\\Users\\Brett\\Documents\\images-' + volume +
      '\\BW_vol3pg' + toRoman(i).toLowerCase() + '.jpg';
  },
  concatenater (text, i) {
    // eslint-disable-next-line no-console
    console.log('Finishing ' + i);
    return '\n\n{{page|' +
      (skip ? '' : (toRoman(i).toLowerCase())) +
      '}}\n\n' + text;
  },
  done () {
    // eslint-disable-next-line no-console
    console.log('Saved!');
  }
});
