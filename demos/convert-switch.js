'use strict';

const skip = false;
const [, , volume, end, offset] = process.argv[2];

const {join} = require('path');
const ot = require('../index'); // require('ocr-bulk');

ot.writeFile({
  start: 1,
  end,
  outputPath: join(__dirname, 'ocr-' + volume + '.txt'),
  readErrback (err, i, resume) {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('Error reading', err);
      return;
    }
    ot.readOCR({
      start: i,
      end: i,
      getImagePath: (idx) => {
        return this.getImagePath(idx);
      },
      processor: this.processor.bind(this),
      readErrback (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        // eslint-disable-next-line no-console
        console.log('finally failed');
      },
      done () {
        resume();
      }
    });
  },
  getImagePath (i) {
    return 'C:\\Users\\Brett\\Documents\\images-' + volume +
      '\\BW_vol3pg' + ot.pad(i, 1) + '.jpg';
  },
  concatenater (text, i) {
    // eslint-disable-next-line no-console
    console.log('Finishing ' + i);
    return '\n\n{{page|' +
      (skip ? '' : (i + (offset ? parseInt(offset) : 0))) +
      '}}\n\n' + text;
  },
  done () {
    // eslint-disable-next-line no-console
    console.log('Saved!');
  }
});
