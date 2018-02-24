const ot = require('./index'); // require('ocr-bulk');
const im = require('gm').subClass({imageMagick: true}),
    pathResolve = require('path').resolve,
    fs = require('fs');

const pdf = process.argv[2];
const targetBase = pdf.replace(/\.pdf$/, '');
const startFrame = parseInt(process.argv[3] || 2, 10) - 1;
const endFrame = parseInt(process.argv[4] || 2, 10) - 1;

if (startFrame > endFrame) {
    throw new Error('Start frame must not be greater than end frame argument');
}

const density = 300;
const quality = 75;

function convertPDFFrames () {
    const pdfRetrievals = [];
    for (let frame = startFrame; frame <= endFrame; frame++) {
        pdfRetrievals.push(
            new Promise((resolve, reject) => {
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
                const writeStream = im(readStream).selectFrame(frame).
                    density(density).quality(quality).stream('jpg').pipe(
                        fs.createWriteStream(
                            pathResolve(__dirname, `${targetBase}-${frame + 1}.jpg`)
                        )
                    );
                readStream.on('error', errorHandler);
                writeStream.on('error', errorHandler);
                writeStream.on('finish', () => {
                    console.log('PDF converted!');
                    resolve();
                });
            })
        );
    }
    return Promise.all(pdfRetrievals);
}
convertPDFFrames().then(() => {
    return ot.writeFile({
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
            console.log('Finishing ' + (i + 1));
            return `\n\n{{page|${i + 1}}}\n\n${text}`;
        }
    });
}).then(function () {
    console.log('Saved!');
}).catch((err) => {
    console.log('Error caught: ' + err);
});
