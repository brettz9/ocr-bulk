/*jslint node:true, vars:true, todo:true*/

(function () {'use strict';

var fs = require('fs');
var t = require('node-tesseract');

exports.pad = function pad (val, len, chr) {
    var arrLen = (len + 1 - val.toString().length);
    if (arrLen <= 1) {
        arrLen = 1;
    }
    return new Array(arrLen).join(typeof chr === 'string' ? chr : '0') + val; // Todo: refactor with String.prototype.repeat
};

var readOCR = exports.readOCR = function readOCR (cfg) {
    var i = cfg.start;
    t.process(cfg.getImagePath(i || 1), function (err, text) {
        if (err) {
            if (cfg.readErrback) {
                cfg.readErrback(err);
                return;
            }
            console.error(err);
        }
        else {
            cfg.processor(text, i);
            if (i < cfg.end) {
                readOCR({start: ++i, end: cfg.end, getImagePath: cfg.getImagePath, processor: cfg.processor, readErrback: cfg.readErrback, done: cfg.done});
                return;
            }
            if (cfg.done) {
                cfg.done();
            }
        }
    });
};

exports.writeFile = function writeFile (cfg) {
    var str = '';
    readOCR({
        start: cfg.start,
        end: cfg.end,
        getImagePath: cfg.getImagePath,
        processor: function (text, i) {
            str += cfg.concatenater(text, i);
        },
        readErrback: cfg.readErrback,
        done: function () {
            fs.writeFile(cfg.outputPath, str, function (err) {
                if (err) {
                    if (cfg.writeErrback) {
                        cfg.writeErrback(err);
                        return;
                    }
                    throw err;
                }
                if (cfg.done) {
                    cfg.done();
                }
            });
        }
    });
};


}());
