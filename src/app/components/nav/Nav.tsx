"use client";
import React, { useContext, Suspense } from 'react';
import LogoImg from "../../assets/images/smart_shop_logo.png";
import classNames from "classnames";
import { useState, useEffect } from 'react';
import './Nav.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link'; 
import Image from 'next/image';
import { CartContext } from '@/app/context';
import { useSearchParams } from 'next/navigation';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'About Us', href: '/about-us' },
  { name: 'Contact Us', href: '/contact-us' },
  { name: 'Cart', href: '/cart' }, // Use FontAwesomeIcon 'faShoppingCart' for cart icon
];

function NavContent() {
  const [searchText, setSearchText] = useState('');
  const searchParams = useSearchParams();

  const handleSearch = (event:any) => {
    setSearchText(event.target.value);
  };

  const getSearchUrl = () => {
    const params = new URLSearchParams();
    
    // Add search text if it exists
    if (searchText) {
      params.set('searchText', searchText);
    }
    
    // Preserve existing minPrice if it exists
    const minPrice = searchParams.get('minPrice');
    if (minPrice) {
      params.set('minPrice', minPrice);
    }
    
    // Preserve existing minRating if it exists
    const minRating = searchParams.get('minRating');
    if (minRating) {
      params.set('minRating', minRating);
    }

    // Preserve existing category if it exists
    const category = searchParams.get('category');
    if (category) {
      params.set('category', category);
    }
    
    return `/products?${params.toString()}`;
  };

  const { cartData } = useContext(CartContext);
  const cartLength = cartData.length;
  
  // Calculate badge position dynamically based on icon size
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link href="/" className="navbar-brand">
            <Image src={LogoImg} height={55} alt={"Logo"} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex flex-grow-1 mx-xl-5" role="search">
              <div className="input-group mb-3">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="form-control"
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                  onChange={handleSearch}
                />
                <div className="input-group-append">
                  <Link href={getSearchUrl()} className={classNames("btn", "search-button")}>
                    <FontAwesomeIcon icon={faSearch} />
                  </Link>
                </div>
              </div>
            </form>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {links.map((link) => (
                <li className="nav-item" key={link.name}>
                  <Link
                    href={link.href}
                    className={classNames("nav-link", {
                      active: link.name === "Home",
                    })}
                  >
                    {link.name === "Cart" ? (
                      <div className="position-relative">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        {cartLength > 0 && (
                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {cartLength}
                          </span>
                        )}
                      </div>
                    ) : (
                      link.name
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default function Nav() {
  return (
    <Suspense fallback={<div>Loading navigation...</div>}>
      <NavContent />
    </Suspense>
  );
}




