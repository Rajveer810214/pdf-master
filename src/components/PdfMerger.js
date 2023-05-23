import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import './PdfMerger.css';
import upload from '../Image/upload.png';
import pdf from '../Image/pdf.png';
import Footer from './Footer';

function PdfMerger() {
  const [count, setCount] = useState("No");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [mergedPdf, setMergedPdf] = useState(null);
  const [isMerging, setIsMerging] = useState(false);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setCount(prevCount => prevCount === "No" ? newFiles.length : prevCount + newFiles.length);
  };

  const handleDeleteFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setCount(selectedFiles.length - 1);
  };

  const handleMergeClick = async () => {
    if (selectedFiles.length > 0) {
      setIsMerging(true);
      const pdfDoc = await PDFDocument.create();

      for (const file of selectedFiles) {
        const loadedFile = await PDFDocument.load(await file.arrayBuffer());
        const sourcePages = await pdfDoc.copyPages(loadedFile, loadedFile.getPageIndices());
        sourcePages.forEach((page) => {
          pdfDoc.addPage(page);
        });
      }

      const mergedPdfData = await pdfDoc.save();
      setMergedPdf(new Blob([mergedPdfData], { type: 'application/pdf' }));
      setIsMerging(false);
    }
  };

  const handleDownloadClick = () => {
    if (mergedPdf) {
      const downloadLink = document.createElement('a');
      const url = URL.createObjectURL(mergedPdf);
      downloadLink.href = url;
      downloadLink.download = "merged.pdf";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      <div className="header">
        <img className="pdf" src={pdf} alt="" />
        <span>PDF Fusion</span>
      </div>
      <div className="mergecontainer">
        <h2 className="pdfmerger">Merge PDF files</h2>
        <p className="mergeLines">Combine PDFs in the order you want with the easiest PDF merger available.</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <label htmlFor="fileInput">
            <span className="file-input">
              {selectedFiles.length > 0 ? (
                <span>
                  <img className="uploadmerge" src={upload} alt="Upload Icon" style={{ maxHeight: '70px', textAlign: "center", margin: "auto", display: "flex" }} />
                  <input type="file" id="fileInput" accept=".pdf" onChange={handleFileChange} multiple hidden />
                </span>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div className="selectMer" style={{ textAlign: 'center' }}>
                    <span>Select Files</span>
                    <input type="file" id="fileInput" accept=".pdf" onChange={handleFileChange} multiple hidden />
                  </div>
                </div>
              )}
            </span>
          </label>
        </div>
        <div className="mergerfiles">
          <span>
            <h3 className='text-center'>{count === "No" ? "No Selected Files" : `${count} Selected Files:`}</h3>
            {selectedFiles.length > 0 ? (
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index}>
                    <span className="pdf-item">
                      <div className="pdf-item-info m-1">
                        <span>{file.name}</span>
                        <button onClick={() => handleDeleteFile(index)} style={{ background: "Red", color: "white", marginLeft: "12px" }}>X</button>
                      </div>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p></p>
            )}
          </span>
        </div>
        <div className="split">
          <button className='mergebutton' onClick={handleMergeClick} disabled={selectedFiles.length === 1} style={{ display: "flex", justifyContent: "center", margin: "auto" }}>
            Merge PDFs
          </button>
          {isMerging && <p>Merging PDFs...</p>}
          {mergedPdf && !isMerging && (
            <button className='downloadbutton' onClick={handleDownloadClick} style={{ display: "flex", justifyContent: "center", margin: "auto" }}>
              Download Merged PDF
            </button>
          )}
        </div>
        <div className="d-flex justify-content-center my-2 jpgFooterM">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default PdfMerger;
