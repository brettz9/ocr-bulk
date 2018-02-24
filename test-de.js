
const ot = require('./index'); // require('ocr-bulk');
ot.writeFile({
    start: 1,
    end: 33,
    tesseractOptions: {
        l: 'deu'
    },
    outputPath: __dirname + '/ocr-de.txt',
    getImagePath (i) {
        return '"/Users/brett/Downloads/1947 xx xx Abdul Baha - Geist der Gemeinschaft - 2004 - Inhalt gesamt/' + ot.pad(i, 4) + '.jpg"';
    },
    concatenater (text, i) {
        console.log('Finishing ' + i);
        return `[[[PAGE ${i}]]]\n\n` + text;
    },
}).then(() => {
    console.log('Saved!');
});
