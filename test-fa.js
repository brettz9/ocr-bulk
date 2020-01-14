'use strict';

const fs = require('fs');
const pathResolve = require('path').resolve;
const im = require('gm').subClass({imageMagick: true});
const ot = require('./index'); // require('ocr-bulk');

const pdf = process.argv[2];
const targetBase = pdf.replace(/\.pdf$/u, '');
const startFrame = parseInt(process.argv[3] || 2) - 1;
const endFrame = parseInt(process.argv[4] || 2) - 1;

if (startFrame > endFrame) {
  throw new Error('Start frame must not be greater than end frame argument');
}

const density = 400;
const quality = 100;

/**
 * @returns {Promise<void>}
 */
function convertPDFFrames () {
  const pdfRetrievals = [];
  for (let frame = startFrame; frame <= endFrame; frame++) {
    pdfRetrievals.push(
      // Todo: Use stream promises?

      // eslint-disable-next-line promise/avoid-new
      new Promise((resolve, reject) => {
        /**
         * @param {Error|string} err
         * @returns {void}
         */
        function errorHandler (err) {
          reject(new Error('Failed to convert' + err));
        }
        /*
        // Working
        im(pathResolve(__dirname, pdf)).selectFrame(frame).write(
          pathResolve(__dirname, `${targetBase}-${frame + 1}.jpg`),
          (err) => {
            if (err) errorHandler(err);
            else {
              console.log('PDF converted!');
              resolve();
            }
          }
        );
        */
        const readStream = fs.createReadStream(pathResolve(__dirname, pdf));
        const writeStream = im(readStream).selectFrame(frame)
          .density(density).quality(quality).stream('jpg').pipe(
            fs.createWriteStream(
              pathResolve(__dirname, `${targetBase}-${frame + 1}.jpg`)
            )
          );
        readStream.on('error', errorHandler);
        writeStream.on('error', errorHandler);
        writeStream.on('finish', () => {
          // eslint-disable-next-line no-console
          console.log('PDF converted!');
          resolve();
        });
      })
    );
  }
  return Promise.all(pdfRetrievals);
}

(async () => {
try {
  await convertPDFFrames();
  await ot.writeFile({
    start: startFrame,
    end: endFrame,
    tesseractOptions: {
      l: 'fas' // Farsi
    },
    outputPath: pathResolve(__dirname, 'ocr-fa.txt'),
    getImagePath (frame) {
      return pathResolve(__dirname, `${targetBase}-${frame + 1}.jpg`);
    },
    concatenater (text, i) {
      // eslint-disable-next-line no-console
      console.log('Finishing ' + (i + 1));
      return `\n\n{{page|${i + 1}}}\n\n${text}`;
    }
  });
  // eslint-disable-next-line no-console
  console.log('Saved!');
} catch (err) {
  // eslint-disable-next-line no-console
  console.log('Error caught: ' + err);
}
})();
