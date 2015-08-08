(function () {'use strict';

var ot = require('./index'); // require('ocr-bulk');
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

}());
