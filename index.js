/*jslint node:true*/

(function () {'use strict';

var fs = require('fs');
var t = require('node-tesseract');

function pad (val, len) {
    var arrLen = (len + 1 - val.toString().length);
    if (arrLen <= 1) {
        arrLen = 1;
    }
    return new Array(arrLen).join('0') + val; // Todo: refactor with String.prototype.repeat
}

function readOCR (i, max, processCb, doneCb) {
    t.process('C:\\Users\\Brett\\Documents\\images\\image-' + pad(i, 4) + '.jpg', function (err, text) { // to 0376.jpg
        if (err) {
            console.error(err);
        }
        else {
            processCb(text, i);
            if (i < max) {                
                readOCR(++i, max, processCb, doneCb);
                return;
            }
            doneCb();
        }
    });
}

var str = '';
readOCR(1, 376, function (text, i) {
        console.log('Finishing ' + i);
        str += '\n\n{{page|' + i + '}}\n\n' + text;
    }, function () {
    fs.writeFile(__dirname + '/ocr.txt', str, function (err) {
        if (err) {
            throw err;
        }
        console.log('Saved!');
    });
});


}());
