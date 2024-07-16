const { fromPath } = require('pdf2pic');
const path = require('path');

const pdfPath = path.join(__dirname, 'assets/file/fcf82d976c3f6fdb-pages.pdf');
const outputPath = path.join(__dirname, 'assets/file/output');

const options = {
  density: 300,
  saveFilename: 'output',
  savePath: outputPath,
  format: 'png',
  width: 800,
  height: 1120,
};

const convertPdfToPng = async () => {
  try {
    const convert = fromPath(pdfPath, options);
    const result = await convert(1, outputPath); // Convert the first page
    console.log('Converted:', result);
  } catch (error) {
    console.error('Error converting PDF to PNG:', error);
  }
};

export default convertPdfToPng();