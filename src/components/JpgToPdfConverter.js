import React, { useState } from 'react';
import jsPDF from 'jspdf';
import pdf from '../Image/pdf.png';
import './Jpgpdf.css';
import Footer from './Footer';

function JpgToPdfConverter() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleDeletePdf = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };
  const convertImagesToPdf = async () => {
    if (selectedFiles.length === 0) {
      console.log('No files selected');
      return;
    }
  
    const doc = new jsPDF();
  
    const loadImagesPromises = selectedFiles.map((file, index) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const imgData = reader.result;
  
          // Get page dimensions
          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();
          const margin = 10; // Adjust the margin size here
  
          // Calculate the image width and height with margins
          const imageWidth = pageWidth - margin * 2;
          const imageHeight = pageHeight - margin * 2;
  
          // Add a new page except for the first image
          if (index !== 0) {
            doc.addPage();
          }
  
          // Adjust the positioning of the image on the page
          const xPos = margin;
          const yPos = margin;
  
          // Add the image with margins and correct positioning
          doc.addImage(imgData, 'JPEG', xPos, yPos, imageWidth, imageHeight);
  
          resolve();
        };
        reader.readAsDataURL(file);
      });
    });
  
    // Wait for all images to be loaded before saving the PDF
    await Promise.all(loadImagesPromises);
  
    const fileName = 'converted_images.pdf';
    doc.save(fileName);
  };
  
  return (
    <div>
      <div className="header">
        <img className="pdf" src={pdf} alt="" />
        <span>PDF Fusion</span>
      </div>
      <div className="mergecontainer">
        <h2 className="pdfmerger">Jpg to Pdf</h2>
        <p className="mergeLines">Convert JPG images to PDF in seconds. Easily adjust orientation and margins.</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="selectMer" style={{ textAlign: 'center' }}>
            <label htmlFor="fileInput">
              {selectedFiles.length === 0 ? (
                <div className="file-input">
                  <span>Select Files</span>
                  <input type="file" id="fileInput" accept=".jpg" onChange={handleFileChange} multiple hidden />
                </div>
              ) : (
                <p></p>
              )}
            </label>
          </div>
        </div>
        {selectedFiles.length > 0 && (
          <span className="pdf-item">
            <div className="pdf-item-info text-center">
             
                {selectedFiles.map((file, index) => (
                  <li key={index}>
                    <span style={{ fontSize: '23px', color: 'red' }}>{file.name}</span>
                    <button
                      onClick={() => handleDeletePdf(index)}
                      style={{
                        background: 'Red',
                        color: 'white',
                        marginLeft: '12px',
                        cursor: 'pointer',
                        border: '2px solid black',
                      }}
                    >
                      X
                    </button>
                  </li>
                ))}
             
            </div>
          </span>
        )}
        <div className="split">
          <button
            className="mergebutton my-4"
            onClick={convertImagesToPdf}
            style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}
            disabled={selectedFiles.length === 0}
          >
            Jpg to Pdf
          </button>
        </div>
        <div className="d-flex justify-content-center my-2 jpgFooterJ">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default JpgToPdfConverter;
