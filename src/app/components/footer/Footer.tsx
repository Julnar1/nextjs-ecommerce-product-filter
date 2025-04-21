import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook} from "@fortawesome/free-brands-svg-icons";
import {faXTwitter} from "@fortawesome/free-brands-svg-icons";
import {faInstagram} from "@fortawesome/free-brands-svg-icons";
import Link from 'next/link'; 

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <ul className="list-unstyled">
              <li><Link href="/contact-us" className="text-decoration-none text-light">Contact Us</Link></li>
              <li><Link href="/about-us" className="text-decoration-none text-light">About Us</Link></li>
              <li><Link href="/" className="text-decoration-none text-light">Careers</Link></li>
              <li><Link href="/" className="text-decoration-none text-light">Smart Shop Stories</Link></li>
              <li><Link href="/" className="text-decoration-none text-light">Press</Link></li>
              <li><Link href="/contact-us" className="text-decoration-none text-light">Corporate Information</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Group Companies</h5>
            <ul className="list-unstyled">
              <li><Link href="/" className="text-decoration-none text-light">Trendify</Link></li>
              <li><Link href="/" className="text-decoration-none text-light">LuxeLane</Link></li>
              <li><Link href="/" className="text-decoration-none text-light">GearHub</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Help</h5>
            <ul className="list-unstyled">
              <li><Link href="/" className="text-decoration-none text-light">Payments</Link></li>
              <li><Link href="/" className="text-decoration-none text-light">Shipping</Link></li>
              <li><Link href="/" className="text-decoration-none text-light">Cancellation & Returns</Link></li>
              <li><Link href="/" className="text-decoration-none text-light">FAQ</Link></li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-6">
            <p className="text-light mb-0">© 2025 Smart Shop. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-end">
            <ul className="list-inline">
              <li className="list-inline-item"><Link href="/" className="text-decoration-none text-light"><FontAwesomeIcon icon={faFacebook} /></Link></li>
              <li className="list-inline-item"><Link href="/" className="text-decoration-none text-light"><FontAwesomeIcon icon={faXTwitter} /></Link></li>
              <li className="list-inline-item"><Link href="/" className="text-decoration-none text-light"><FontAwesomeIcon icon={faInstagram} /></Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}