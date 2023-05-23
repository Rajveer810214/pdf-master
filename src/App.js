// import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PdfMerger from './components/PdfMerger';
import Split from './components/PdfSplitter';
import Home from './components/Home';
// import Compress from './components/JpgToPdfConverter'
import JpgToPdfConverter from './components/JpgToPdfConverter';
// import PdfToWord from './components/PdfToWord'
import Footer from './components/Footer';

function App() {
  return (
    <div>  
    
      {/* <Home/> */}
{/* <Compress/> */}
      <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/split" element={<Split/>} />
      <Route exact path="/merge" element={<PdfMerger/>}/>
      <Route exact path="/jpgtopdf" element={<JpgToPdfConverter/>}/>
      </Routes>
    </BrowserRouter>
    </div>

  );
}

export default App;
