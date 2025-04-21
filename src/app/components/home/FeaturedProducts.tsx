"use client"
import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';
import { toast } from 'react-toastify';
import { CartContext } from '@/app/context/index';

// Define the Product type for FakeStore API
interface Product {
  id: number;
  title: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  image: string;
  category: string;
}

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // Fetch all products from FakeStore API
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        // Filter products based on rating (> 4)
        let filteredProducts = data.filter((product: Product) => 
          product.rating.rate > 4
        );
        
        // If we don't have enough high-rated products, include some with lower ratings
        if (filteredProducts.length < 4) {
          const remainingCount = 4 - filteredProducts.length;
          const lowerRatedProducts = data
            .filter((product: Product) => product.rating.rate <= 4)
            .sort((a: Product, b: Product) => b.rating.rate - a.rating.rate)
            .slice(0, remainingCount);
          
          filteredProducts = [...filteredProducts, ...lowerRatedProducts];
        }
        
        // Randomly select 4 products from the filtered list
        const shuffled = [...filteredProducts].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4);
        
        setFeaturedProducts(selected);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured products:', error);
        setError('Failed to load featured products. Please try again later.');
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    
    // Create a properly typed cart item
    const cartItem = {
      id: product.id,
      quantity: 1,
      price: product.price,
      title: product.title,
      image: product.image
    };
    
    // Add the product to the cart context
    addToCart(cartItem);
    
    // Show toast notification
    toast.success(`"${product.title}" added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  if (loading) {
    return (
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Featured Products</h2>
          <div className="row g-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="col-6 col-sm-6 col-md-3">
                <div className="card h-100 shadow-sm">
                  <div className={styles.imageContainer}>
                    <div className="bg-light w-100 h-100 d-flex align-items-center justify-content-center">
                      <span className="text-muted">Loading...</span>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="placeholder-glow">
                      <span className="placeholder col-7"></span>
                      <div className="d-flex justify-content-between mt-2">
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-3"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Featured Products</h2>
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Featured Products</h2>
        <div className="row g-4">
          {featuredProducts.map((product) => (
            <div key={product.id} className="col-6 col-sm-6 col-md-3">
              <div className={`card h-100 shadow-sm ${styles.card} d-flex flex-column`}>
                <Link href={`/products/${product.id}`} className="text-decoration-none flex-grow-1">
                  <div className={styles.imageContainer}>
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className={`rounded-top ${styles.image}`}
                      onError={(e) => {
                        // Fallback for image loading errors
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title text-dark">{product.title}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-dark fw-bold">${product.price}</span>
                      <div className="d-flex align-items-center">
                        <span className="text-warning">★</span>
                        <span className="ms-1 text-muted">{product.rating.rate}</span>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="card-footer bg-white border-top-0 mt-auto">
                  <button 
                    className="btn btn-warning w-100"
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 