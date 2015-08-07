# ocr-tool

For performing OCR recognition on images.

**This repository is currently just a hard-coded example usage of node-tesseract**

# Installation

1. Install [node-tesseract](https://github.com/tesseract-ocr/tesseract) (e.g., the [Windows installer](https://code.google.com/p/tesseract-ocr/downloads/detail?name=tesseract-ocr-setup-3.02.02.exe&can=2&q=)).
1. ```npm install .```

# Usage

`node index`

# Todos

1. Stop hard-coding and make an interface, allowing for dynamic control of directory, file count, text processing, etc.
1. Add [node-imagemagick](https://github.com/yourdeveloper/node-imagemagick) or [node-imagemagick-native](https://github.com/mash/node-imagemagick-native) dependency for [converting PDFs](http://kiirani.com/2013/03/22/tesseract-pdf.html).
1. Note: Could use http://manuels.github.io/unix-toolbox.js/ for client-side conversion, esp. if Tesseract could ever be
[converted to asm.js](https://github.com/tesseract-ocr/tesseract/issues/75).
