(function () {'use strict';

var volume = process.argv[2];
var offset = process.argv[3];
var skip = false;

var ot = require('./index'); // require('ocr-bulk');
ot.writeFile({
    start: 1,
    end: 5, // ; prefatory + 1-377
    outputPath: __dirname + '/ocr-' + volume + '.txt',
    readErrback: function (err, i, resume) {
        ot.readOCR({start: i, end: i, getImagePath: function (idx) {
            return this.getImagePath(idx).replace(/\.jpg$/, '.png');
        }.bind(this), processor: this.processor.bind(this), readErrback: function () {
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
