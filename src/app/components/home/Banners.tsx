"use client"
import React, { useState, Suspense } from 'react';
import Image  from 'next/image'; 
import jewellery from '../../assets/images/carousel/bracelet-carousel.webp';
import mensFashion from '../../assets/images/carousel//image-carousel-men.jpg';
import womensFashionSale from'../../assets/images/carousel//womens-fashion-carousel.jpg';
import Link from 'next/link'; 
import { useSearchParams } from 'next/navigation';

function BannersContent() {
  const [activeIndex, setActiveIndex] = useState(0); 
  const searchParams = useSearchParams();
  
  const bannerImages = [
    {
      image: jewellery,
      title: 'Sparkling Deals on Jewellery',
      subtitle: 'Explore our stunning collection of bracelets, rings, and more.',
      category:"jewelery"
    },
    {
      image:mensFashion ,
      title: "Men's Fashion: Style & Comfort",
      subtitle:  "Discover the latest trends in men's clothing and accessories.",
      category:"men's clothing"
    },
    {
      image: womensFashionSale,
      title: "Women's Fashion Sale: Up to 30% Off",
      subtitle: "Elevate your style with amazing deals on women's clothing and accessories.",
      category:"women's clothing"
    },
  ];
  
  function handlePrevClick() {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1));
  }

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => (prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1));
  };
  
  const getProductUrl = (category: string) => {
    const params = new URLSearchParams();
    
    // Add category parameter
    params.set('category', category);
    
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
    
    // Preserve existing searchText if it exists
    const searchText = searchParams.get('searchText');
    if (searchText) {
      params.set('searchText', searchText);
    }
    
    return `/products?${params.toString()}`;
  };
  
  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {bannerImages.map((banner, index) => (
          <div 
            className={`carousel-item ${index === activeIndex ? 'active' : ''}`} 
            key={index}
          >
            <Link href={getProductUrl(banner.category)}>
            <Image height={400}
              src={banner.image} 
              alt={`Banner ${index + 1}`} 
              className="d-block w-100" 
            />
            <div className="carousel-caption d-none d-md-block text-dark fw-bold text-end"> 
              <h5>{banner.title}</h5>
              <p className="text-muted">{banner.subtitle}</p>
              <button className="btn btn-warning rounded">Shop Now</button>
            </div>
            </Link>
          </div>
        ))}
      </div>
      <button 
        className="carousel-control-prev" 
        type="button" 
        data-bs-target="#carouselExampleIndicators" 
        data-bs-slide="prev" 
        onClick={handlePrevClick}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button 
        className="carousel-control-next" 
        type="button" 
        data-bs-target="#carouselExampleIndicators" 
        data-bs-slide="next" 
        onClick={handleNextClick}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
      <div className="carousel-indicators">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            className={index === activeIndex ? 'active' : ''}
            aria-current={index === activeIndex ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default function Banners() {
  return (
    <Suspense fallback={<div>Loading banners...</div>}>
      <BannersContent />
    </Suspense>
  );
}
