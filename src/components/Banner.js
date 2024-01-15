import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Banner.css'; // Import your styles

export default function Banner() {
  return (
    <div className="section-hero">
      <div className="overlay"></div>
      <div className="banner-content">

          <h1 className="banner-heading">PREPARE YOUR PUP FOR THE ULTIMATE APAWCALYPSE</h1>
          <div className="link-wrapper">
            <Link to="/shop" className="button w-inline-block">
              <div className="hero-btn">
                <div className="button-text">SHOP NOW</div>
              </div>
            </Link>
          </div>

      </div>
    </div>
  );
};