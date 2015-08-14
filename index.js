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
        function resume () {
            if (i < cfg.end) {
                readOCR({start: ++i, end: cfg.end, getImagePath: cfg.getImagePath.bind(cfg), processor: cfg.processor.bind(cfg), readErrback: cfg.readErrback && cfg.readErrback.bind(cfg), done: cfg.done && cfg.done.bind(cfg)});
                return;
            }
            if (cfg.done) {
                cfg.done();
            }
        }
        if (err) {
            if (cfg.readErrback) {
                cfg.readErrback(err, i, resume);
                return;
            }
            else {
                console.error(err);
            }
        }
        else {
            cfg.processor(text, i);
        }
        resume();
    });
};

exports.writeFile = function writeFile (cfg) {
    readOCR({
        cfg: cfg,
        start: cfg.start,
        end: cfg.end,
        str: '',
        getImagePath: cfg.getImagePath,
        processor: function (text, i) {
            this.str += this.cfg.concatenater(text, i);
        },
        readErrback: cfg.readErrback,
        done: function () {
            fs.writeFile(this.cfg.outputPath, this.str, function (err) {
                if (err) {
                    if (this.cfg.writeErrback) {
                        this.cfg.writeErrback(err);
                        return;
                    }
                    throw err;
                }
                if (this.cfg.done) {
                    this.cfg.done();
                }
            }.bind(this));
        }
    });
};


}());
