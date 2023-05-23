import React from 'react'
import './Home.css'
import pdf from '../Image/pdf.png'
import merge from '../Image/merger.png'
import split from '../Image/split.png'
import compress from '../Image/compress.png'
import { Link } from 'react-router-dom'
import Footer from './Footer'
export default function Home() {
   
  return (
    <div style={{    background: "#f0f0f0"}}>
     <div className="header"><img className='pdf' src={pdf} alt='' /> <span><Link to="/" className='pdf-name'>PDF Fusion</Link></span></div>
      <div className="section"><h2>Every tool you need to work with PDFs in one place</h2>
      <div className="section1">Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.</div></div>
    <div className=" container text-center my-4  d-flex justify-content-center my-4">

    <div className="card mx-auto  my-4" style={{width: "18rem"}}>
  <img src={merge} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Merge Pdf</h5>
    <p className="card-text">Combine PDFs in the order you want with the easiest PDF merger available.</p>
    <Link to="/merge" className="btn btn-danger ">Merge Pdf</Link>
  </div>
        
</div>

<div className="card mx-auto  my-4" style={{width: "18rem"}}>
  <img src={split} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Split Pdf</h5>
    <p className="card-text">Separate one page or a whole set for easy conversion into independent PDF files.</p>
    <Link to="/split" className="btn btn-danger ">Split Pdf</Link>
  </div>
        
</div>

<div className="card  mx-auto my-4" style={{width: "18rem"}}>
  <img src={compress} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Jpg to Pdf</h5>
    <p className="card-text">Convert JPG images to PDF in seconds. Easily adjust orientation and margins.</p>
    <Link to="/jpgtopdf" className="btn btn-danger ">Jpg to Pdf</Link>
  </div>
        
</div>
    </div>
    <div
        className=" d-flex justify-content-center my-2 " 
      >
        <Footer />
      </div>
    </div>
    
  )
}
