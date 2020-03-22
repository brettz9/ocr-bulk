'use strict';

const fs = require('fs');
const t = require('node-tesseract');

exports.pad = function pad (val, len, chr) {
  val = val.toString();
  return val.padStart(len, typeof chr === 'string' ? chr : '0');
};

const readOCR = exports.readOCR = function readOCR (cfg) {
  let i = cfg.start;
  // eslint-disable-next-line promise/avoid-new, no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    let text;
    try {
      text = await t.process(
        cfg.getImagePath(i || 1),
        cfg.tesseractOptions || {}
      );
    } catch (err) {
      if (cfg.readErrback) {
        cfg.readErrback(err, i, resume, resolve, reject);
      } else {
        reject(err);
      }
      return;
    }
    // Todo: Give option to resolve Promises in parallel
    /**
     * @returns {Promise<void>}
     */
    async function resume () {
      if (i < cfg.end) {
        await readOCR({
          start: ++i,
          end: cfg.end,
          getImagePath: cfg.getImagePath.bind(cfg),
          processor: cfg.processor.bind(cfg),
          readErrback: cfg.readErrback && cfg.readErrback.bind(cfg),
          done: cfg.done && cfg.done.bind(cfg)
        });
        resolve(cfg);
        return;
      }
      if (cfg.done) {
        cfg.done();
      }
      resolve(cfg);
    }
    cfg.processor(text, i);
    resume();
  });
};

exports.writeFile = async function writeFile (cfg) {
  const {str} = await readOCR({
    start: cfg.start,
    end: cfg.end,
    tesseractOptions: cfg.tesseractOptions,
    str: '',
    getImagePath: cfg.getImagePath,
    processor (text, i) {
      this.str += cfg.concatenater(text, i);
    },
    readErrback: cfg.readErrback
  });

  // todo[engine:node@>=12]: Use built-in fs promises
  // eslint-disable-next-line promise/avoid-new
  return new Promise((resolve, reject) => {
    fs.writeFile(cfg.outputPath, str, {
      encoding: 'encoding' in cfg ? cfg.encoding : 'utf8'
      // eslint-disable-next-line promise/prefer-await-to-callbacks
    }, function (err) {
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
};
