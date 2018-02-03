(function () {'use strict';

const skip = false;
const volume = process.argv[2];
const end = process.argv[3];
const offset = process.argv[4];

var ot = require('./index'); // require('ocr-bulk');
ot.writeFile({
    start: 1,
    end,
    outputPath: __dirname + '/ocr-' + volume + '.txt',
    readErrback: function (err, i, resume) {
        ot.readOCR({start: i, end: i, getImagePath: function (idx) {
            return this.getImagePath(idx);
        }.bind(this), processor: this.processor.bind(this), readErrback: function (err) {
            console.log(err);
            console.log('finally failed');
        }, done: function () {
            resume();
        }});
    },
    getImagePath: function (i) {
        return 'C:\\Users\\Brett\\Documents\\images-' + volume + '\\BW_vol3pg' + ot.pad(i, 1) + '.jpg';
    },
    concatenater: function (text, i) {
        console.log('Finishing ' + i);
        return '\n\n{{page|' +
            (skip ? '' : (i + (offset ? parseInt(offset, 10) : 0))) +
            '}}\n\n' + text;
    },
    done: function () {
        console.log('Saved!');
    }
});

}());
