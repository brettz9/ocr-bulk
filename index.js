(function () {'use strict';

const fs = require('fs');
const t = require('node-tesseract');

exports.pad = function pad (val, len, chr) {
    val = val.toString();
    if (val.padStart) { // Todo: Just use this block when supported
        return val.padStart(len, typeof chr === 'string' ? chr : '0');
    }
    let arrLen = (len + 1 - val.length);
    if (arrLen <= 1) {
        arrLen = 1;
    }
    return new Array(arrLen).join(typeof chr === 'string' ? chr : '0') + val;
};

const readOCR = exports.readOCR = function readOCR (cfg) {
    let i = cfg.start;
    return new Promise((resolve, reject) => {
        t.process(cfg.getImagePath(i || 1), cfg.tesseractOptions || {}, function (err, text) {
            function resume () {
                if (i < cfg.end) {
                    readOCR({
                        start: ++i,
                        end: cfg.end,
                        getImagePath: cfg.getImagePath.bind(cfg),
                        processor: cfg.processor.bind(cfg),
                        readErrback: cfg.readErrback && cfg.readErrback.bind(cfg),
                        done: cfg.done && cfg.done.bind(cfg)
                    }).then(() => {
                        resolve(cfg);
                    });
                    return;
                }
                if (cfg.done) {
                    cfg.done();
                }
                resolve(cfg);
            }
            if (err) {
                if (cfg.readErrback) {
                    cfg.readErrback(err, i, resume, resolve, reject);
                } else {
                    reject(err);
                }
                return;
            }
            cfg.processor(text, i);
            resume();
        });
    });
};

exports.writeFile = function writeFile (cfg) {
    return readOCR({
        start: cfg.start,
        end: cfg.end,
        tesseractOptions: cfg.tesseractOptions,
        str: '',
        getImagePath: cfg.getImagePath,
        processor (text, i) {
            this.str += cfg.concatenater(text, i);
        },
        readErrback: cfg.readErrback
    }).then(function ({str}) {
        return new Promise((resolve, reject) => {
            fs.writeFile(cfg.outputPath, str, function (err) {
                if (err) {
                    if (cfg.writeErrback) {
                        cfg.writeErrback(err);
                        return;
                    }
                    reject(err);
                    return;
                }
                if (cfg.done) {
                    cfg.done();
                }
                resolve();
            });
        });
    });
};


}());
