import React from 'react';
import { getDocument } from 'pdfjs-dist/webpack';
import Docxtemplater from 'docxtemplater';
import JSZip from 'jszip';
async function convertPdfToWord() {
  const fileInput = document.getElementById('pdf-file');
  const file = fileInput.files[0];
  if (!file) {
    console.log('No file selected');
    return;
  }
  const fileReader = new FileReader();
  fileReader.onload = async () => {
    const arrayBuffer = fileReader.result;
    const pdf = await getDocument(arrayBuffer).promise;
    const numPages = pdf.numPages;
    let text = '';
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const items = content.items;
      for (let j = 0; j < items.length; j++) {
        text += items[j].str;
      }
    }
    const zip = new JSZip();
    const templateFile = await zip.loadAsync(await fetch('template.docx').then(response => response.blob()));

    const template = new Docxtemplater().loadZip(templateFile);
    template.setData({ text });
    template.render();

    const outputBuffer = template.getZip().generate({ type: 'arraybuffer' });
    const wordBlob = new Blob([outputBuffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const downloadLink = URL.createObjectURL(wordBlob);
    window.open(downloadLink);
  };
  fileReader.readAsArrayBuffer(file);
}
function PdfToWordConverter() {
  return (
    <div>
      <input type="file" id="pdf-file" accept=".pdf" />
      <button onClick={convertPdfToWord}>Convert to Word</button>
    </div>
  );
}
export default PdfToWordConverter;
