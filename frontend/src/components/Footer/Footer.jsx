import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus voluptate, tempore omnis similique porro magnam eaque molestiae, esse totam fuga nostrum rem praesentium, laudantium ipsum minima suscipit. Alias, itaque architecto!</p>
            <div className="footer-social-icons">
              <img src={assets.facebook_icon} alt="" />
              <img src={assets.twitter_icon} alt="" />
              <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-centre">
             <h2>COMPANY</h2>
             <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
             </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
              <li>+1-212-456-7890</li>
              <li>contect@totam.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copy-right 2025 @ tomato.com - All Right Reserver
      </p>
    </div>
  )
}

export default Footer
