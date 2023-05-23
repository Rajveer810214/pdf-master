import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import pdf from '../Image/pdf.png';
import './PdfSplitter.css';
import Footer from './Footer';
function PdfSplitter() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [splitPdf, setSplitPdf] = useState(null);
  const [fromPage, setFromPage] = useState(1);
  const [toPage, setToPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [isSplitting, setIsSplitting] = useState(false);
  const [showDownloadButton, setShowDownloadButton] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return; // No file selected, do nothing
    }
  
    setSelectedFile(file);
    const pdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pageCount = pdfDoc.getPageCount();
    setPageCount(pageCount);
    setToPage(pageCount);
  };

  const handleFromPageChange = (event) => {
    const from = parseInt(event.target.value);
    setFromPage(from);
  };

  const handleToPageChange = (event) => {
    const to = parseInt(event.target.value);
    setToPage(to);
  };

  const handleSplitClick = async () => {
    if (selectedFile) {
      const pdfBytes = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pageCount = pdfDoc.getPageCount();

      if (fromPage < 1 || toPage > pageCount || fromPage > toPage) {
        alert('Invalid page range');
        return;
      }

      setIsSplitting(true); // Show the spinner
      const splitPdfDoc = await PDFDocument.create();
      for (let pageIndex = fromPage - 1; pageIndex < toPage; pageIndex++) {
        const [copiedPage] = await splitPdfDoc.copyPages(pdfDoc, [pageIndex]);
        splitPdfDoc.addPage(copiedPage);
      }

      const splitPdfData = await splitPdfDoc.save();
      setSplitPdf(URL.createObjectURL(new Blob([splitPdfData], { type: 'application/pdf' })));
      setIsSplitting(false); // Hide the spinner
      setShowDownloadButton(true); // Show the download button
    }
  };

  const handleDeletePdf = () => {
    setSelectedFile(null);
    setSplitPdf(null);
    setFromPage(1);
    setToPage(1);
    setPageCount(1);
    setShowDownloadButton(false); // Hide the download button
  };

  function isPageRangeValid() {return fromPage < 1 || toPage > pageCount || fromPage > toPage};

  const handleDownloadPdf = () => {
    const link = document.createElement('a');
    link.href = splitPdf;
    link.download = selectedFile.name;;
    link.click();
  };

  return (
    <div>
      <div className="header">
        <img className="pdf" src={pdf} alt="" />
        <span>PDF Fusion</span>
      </div>
      <div className={`mergecontainer ${splitPdf ? 'splitPdfVisible' : ''}`}>
        <h2 className="pdfmerger">PDF Splitter</h2>
        <p className="mergeLines">Separate one page or a whole set for easy conversion into independent PDF files.</p>

                <label htmlFor="fileInput">
            {selectedFile === null ? (
              <div className="selectMer" style={{ textAlign: 'center' }}>
          <div className="file-input">
                <span>Select Files</span>
                <input type="file" id="fileInput" accept=".pdf" onChange={handleFileChange} hidden />
                </div>
                 </div>
            ) : (
              <span></span>
            )}
          
        </label>
            
             
        {selectedFile && (
          <span className="pdf-item">
            <div className="pdf-item-info m-4 text-center">
              <li>
                <span style={{ fontSize: "23px", color: "red" }}>{selectedFile.name}</span>
                <button
                  onClick={handleDeletePdf}
                  style={{
                    background: "Red",
                    color: "white",
                    marginLeft: "12px",
                    cursor: "pointer",
                    border: "2px solid black",
                  }}
                >
                  X
                </button>
              </li>
            </div>
          </span>
        )}

        <div className="pages ">
          <label htmlFor="fromPageInput">
            From Page:
            <input
              type="number"
              id="fromPageInput"
              value={fromPage}
              onChange={handleFromPageChange}
              disabled={selectedFile === null}
              min="1"
              max={pageCount}
              style={{ color: isPageRangeValid() ? 'red' : 'black' }}
            />
          </label>
          <label htmlFor="toPageInput">
            To Page:
            <input
              type="number"
              id="toPageInput"
              value={toPage}
              onChange={handleToPageChange}
              disabled={selectedFile === null}
              min={1}
              max={pageCount}
              style={{ color: isPageRangeValid() ? 'red' : 'black' }}
            />
          </label>
        </div>
        <div className="split">
        <button
          className="mergebutton my-4"
          onClick={handleSplitClick}
          style={{ display: "flex", justifyContent: "center", margin: "auto" }}
          disabled={selectedFile === null || isPageRangeValid()}
        >Split Pdf
          </button>
          {isSplitting && <p>Splitting PDFs...</p>}

        

          {splitPdf && !isSplitting && showDownloadButton && (
  <button className='downloadbutton ' onClick={handleDownloadPdf} style={{ display: "flex", justifyContent: "center", margin: "auto" }}>
    Download Split PDF
  </button>
)}


        
      </div>
      <div
        className=" d-flex justify-content-center  jpgFooterS"
       
      >
        <Footer />
      </div>
      </div>
    </div>
  );
}

export default PdfSplitter;
