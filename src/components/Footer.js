import React, { Component } from 'react'
export class Footer extends Component {
  render() {
    return (
      <div className='FooterHead'>
        <h3 className='text-center '> Connect me</h3>
        <div className="d-flex justify-content-center Footer text-center mx-auto my-4" >
        <img target="_blank"src={require('../Image/instagram.jpg')} onClick={() => window.open("https://www.instagram.com/rajveer_sidhu_12","_blank")} style={{display: "block",
    marginLeft: "auto",
    marginRight: "auto", transition: "transform 0.5s", transform: "rotate(0deg)"}} alt=""
  onMouseEnter={(e) => e.currentTarget.style.transform = "rotate(360deg)"}
  onMouseLeave={(e) => e.currentTarget.style.transform = "rotate(0deg)"}
/>
<img target="_blank"src={require('../Image/linkdin.png')} onClick={() => window.open("https://www.linkedin.com/in/rajveer-singh-sidhu-534a25232","_blank")} style={{display: "block",
    marginLeft: "auto",
    marginRight: "auto", transition: "transform 0.5s", transform: "rotate(0deg)"}} alt=""
  onMouseEnter={(e) => e.currentTarget.style.transform = "rotate(360deg)"}
  onMouseLeave={(e) => e.currentTarget.style.transform = "rotate(0deg)"}
/>

<img target="_blank"src={require('../Image/twitter.png')} onClick={() => window.open("https://twitter.com/Rajveer810214?t=EOa00qzs2O9t9YfW4x4CpQ&s=08","_blank")} style={{display: "block",
    marginLeft: "auto",
    marginRight: "auto", transition: "transform 0.5s", transform: "rotate(0deg)"}} alt=""
  onMouseEnter={(e) => e.currentTarget.style.transform = "rotate(360deg)"}
  onMouseLeave={(e) => e.currentTarget.style.transform = "rotate(0deg)"}
/>
<img target="_blank"src={require('../Image/github.png')} onClick={() => window.open("https://github.com/Rajveer810214","_blank")} style={{display: "block",
    marginLeft: "auto",
    marginRight: "auto", transition: "transform 0.5s", transform: "rotate(0deg)"}} alt=""
  onMouseEnter={(e) => e.currentTarget.style.transform = "rotate(360deg)"}
  onMouseLeave={(e) => e.currentTarget.style.transform = "rotate(0deg)"}
/>
</div>
        <footer className="py-3 mx-auto d-flex justify-content-center">
  <div className="container-fluid">
    <p className="text-center text-secondary">Copyright &copy; PDF Fusion By <a  href="https://rajveersidhu.vercel.app" target="_Blank" style={{color:"hsl(224deg 20% 19%)",fontWeight:"bold"}}>Rajveer Sidhu</a></p>
  </div>
</footer>
      </div>
    )
  }
}
export default Footer
