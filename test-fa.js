const ot = require('./index'); // require('ocr-bulk');
ot.writeFile({
    start: 1,
    end: 1,
    tesseractOptions: {
        l: 'fas'
    },
    outputPath: __dirname + '/ocr-fa.txt',
    getImagePath: function (i) {
        return '/Users/brett/ocr-bulk/sw' + ot.pad(i, 1) + '.jpg';
    },
    concatenater: function (text, i) {
        console.log('Finishing ' + i);
        return '\n\n' + text;
    },
    done: function () {
        console.log('Saved!');
    }
});
