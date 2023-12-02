const fs = require('fs');
const pdf = require('pdf-parse');

// Path to your local PDF file
const pdfFilePath = 'resume public.pdf';

// Read the PDF file
const dataBuffer = fs.readFileSync(pdfFilePath);

// Convert PDF to text
pdf(dataBuffer).then(function (data) {
  const text = data.text;
  console.log(text);
}).catch(function (error) {
  console.error(error);
});
