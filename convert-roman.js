(function () {'use strict';

var volume = process.argv[2];
var offset = process.argv[3];
var skip = false;

var toRoman = require('roman-numerals').toRoman;
var ot = require('./index'); // require('ocr-bulk');
ot.writeFile({
    start: 1,
    end: 15,
    outputPath: __dirname + '/ocr-' + volume + '.txt',
    getImagePath: function (i) {
        return 'C:\\Users\\Brett\\Documents\\images-' + volume + '\\BW_vol3pg' + toRoman(i).toLowerCase() + '.jpg';
    },
    concatenater: function (text, i) {
        console.log('Finishing ' + i);
        return '\n\n{{page|' +
            (skip ? '' : (toRoman(i).toLowerCase())) +
            '}}\n\n' + text;
    },
    done: function () {
        console.log('Saved!');
    }
});

}());
