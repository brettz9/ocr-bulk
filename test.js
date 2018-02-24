(() => {'use strict';

const ot = require('./index'); // require('ocr-bulk');
ot.writeFile({
    start: 1,
    end: 3,
    outputPath: __dirname + '/ocr.txt',
    getImagePath (i) {
        return 'C:\\Users\\Brett\\Documents\\images\\image-' + ot.pad(i, 4) + '.jpg';
    },
    concatenater (text, i) {
        console.log('Finishing ' + i);
        return '\n\n{{page|' + i + '}}\n\n' + text;
    },
    done () {
        console.log('Saved!');
    }
});

}());
