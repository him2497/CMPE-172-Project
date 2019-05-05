import React, { Component } from 'react'
import './footer.css'
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";


export default class footer extends Component {
  render() {
    return (
        <div>
          <footer className="site-footer">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <h6>About</h6>
                <p className="text-justify">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>

              <div className="col-xs-6 col-md-3">
              </div>

              <div className="col-xs-6 col-md-3">
                <h6>Quick Links</h6>
                <ul className="footer-links">
                  <li><a href="http://alternativedojo.com/about/">About Us</a></li>
                  <li><a href="http://alternativedojo.com/contact/">Contact Us</a></li>
                  <li><a href="http://alternativedojo.com/contribute-at-scanfcode/">Contribute</a></li>
                  <li><a href="http://alternativedojo.com/privacy-policy/">Privacy Policy</a></li>
                  <li><a href="http://alternativedojo.com/sitemap/">Sitemap</a></li>
                </ul>
              </div>
            </div>
            {/* <hr> */}
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-sm-6 col-xs-12">
                <p className="copyright-text">Copyright &copy; 2019 All Rights Reserved by 
            <a href="/"> Alternative Dojo 2.0</a>.
                </p>
              </div>

              <div className="col-md-4 col-sm-6 col-xs-12">
                <ul className="social-icons">
                  <li><a className="facebook" href="/fb"><FaFacebookF/></a></li>
                  <li><a className="twitter" href="/tw"><FaTwitter/></a></li>
                  <li><a className="linkedin" href="/ln"><FaLinkedinIn /></a></li>   
                </ul>
              </div>
            </div>
          </div>
          </footer>
        </div>
    )
  }
}
