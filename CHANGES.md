# CHANGES for ocr-bulk

## 0.6.0

- Update: Point to `node-tesseract` which supports PDF output

## 0.5.0

- Update: Point to `node-tesseract` which can work with Tesseract 5 alpha;
  require Node 8.3.0+
- Docs: Fix reference to tesseract
- Refactoring: Move demo files to own directory
- npm: Update devDeps; add `package-lock.json` in place of yarn

## 0.4.0

- Fix: Include `roman-numerals` dependency
- Linting (Markdown): Remove `.remarkrc`
- Docs: Clean-up Markdown
- Maintenance: Add `.editorconfig`
- npm: Add ignore file
- npm: Add eslint script

## 0.3.1

- npm: Update `package-lock.json`

## 0.3.0

- Enhancement: Add `gm` for PDF processing and use in Persian
    example (which also uses arguments)
- Enhancement: Return Promises from `readOCR` and `writeFile`
- Refactoring: ES6 in examples
- Github: Remove Greenkeeper
- Build: Add yarn.lock

## 0.2.0

- Enhancement: Support passing in Tesseract options (e.g., to indicate a
    language)
- Refactoring: Use some ES6 features
- License: Change to include type (MIT) in file name
- Install: Add `package-lock.json`
- Docs: Update to-dos per new info

## 0.1.0

- Initial commit
