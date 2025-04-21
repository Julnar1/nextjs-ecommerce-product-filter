'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCheck } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

function SidebarFilterContent({ minRating, minPrice }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State to track selected filters
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  // Initialize state from URL params
  useEffect(() => {
    // Parse price ranges from URL
    const priceParam = searchParams.get('minPrice');
    if (priceParam) {
      setSelectedPriceRanges([parseInt(priceParam)]);
    }
    
    // Parse ratings from URL
    const ratingParam = searchParams.get('minRating');
    if (ratingParam) {
      setSelectedRatings([parseInt(ratingParam)]);
    }
  }, [searchParams]);

  const handlePriceChange = (price: number) => {
    let newSelectedPrices: number[];
    
    if (selectedPriceRanges.includes(price)) {
      // Remove if already selected
      newSelectedPrices = selectedPriceRanges.filter(p => p !== price);
    } else {
      // Add to selection
      newSelectedPrices = [...selectedPriceRanges, price];
    }
    
    setSelectedPriceRanges(newSelectedPrices);
    updateUrlParams(newSelectedPrices, selectedRatings);
  };

  const handleRatingChange = (rating: number) => {
    let newSelectedRatings: number[];
    
    if (selectedRatings.includes(rating)) {
      // Remove if already selected
      newSelectedRatings = selectedRatings.filter(r => r !== rating);
    } else {
      // Add to selection
      newSelectedRatings = [...selectedRatings, rating];
    }
    
    setSelectedRatings(newSelectedRatings);
    updateUrlParams(selectedPriceRanges, newSelectedRatings);
  };

  const updateUrlParams = (prices: number[], ratings: number[]) => {
    const params = new URLSearchParams();
    
    // Add price params
    if (prices.length > 0) {
      // For simplicity, we'll use the highest price range as the filter
      const maxPrice = Math.max(...prices);
      params.set('minPrice', maxPrice.toString());
    }
    
    // Add rating params
    if (ratings.length > 0) {
      // For simplicity, we'll use the highest rating as the filter
      const maxRating = Math.max(...ratings);
      params.set('minRating', maxRating.toString());
    }
    
    // Preserve category if it exists
    const category = searchParams.get('category');
    if (category) {
      params.set('category', category);
    }
    
    // Preserve searchText if it exists
    const searchText = searchParams.get('searchText');
    if (searchText) {
      params.set('searchText', searchText);
    }
    
    // Push the updated query string to the URL
    router.push(`/products?${params.toString()}`);
  };
  
  const handleClearFilters = () => {
    setSelectedPriceRanges([]);
    setSelectedRatings([]);
    
    // Create a new URLSearchParams object
    const params = new URLSearchParams();
    
    // Preserve category if it exists
    const category = searchParams.get('category');
    if (category) {
      params.set('category', category);
    }
    
    // Preserve searchText if it exists
    const searchText = searchParams.get('searchText');
    if (searchText) {
      params.set('searchText', searchText);
    }
    
    // Push the updated query string to the URL
    router.push(`/products?${params.toString()}`);
  };

  // Check if any filters are active
  const hasActiveFilters = selectedPriceRanges.length > 0 || selectedRatings.length > 0;

  return (
    <div className="sidebar-filter p-3 bg-light rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Filters</h5>
        {hasActiveFilters && (
          <button 
            onClick={handleClearFilters} 
            className="btn btn-sm btn-outline-danger"
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="mb-4">
        <h6 className="border-bottom pb-2">Price Range</h6>
        {['0', '51', '101', '151', '201'].map((price, index) => {
          const priceValue = parseInt(price);
          const isActive = selectedPriceRanges.includes(priceValue);
          return (
            <div key={index} className="mb-2">
              <label className={classNames(
                "d-flex align-items-center p-2 rounded filter-option",
                { "active-filter": isActive }
              )}>
                <div className="form-check">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => handlePriceChange(priceValue)}
                    className="form-check-input"
                  />
                  <span className="form-check-label ms-2">
                    {index === 0
                      ? 'Under AED 50'
                      : index === 4
                      ? 'Above AED 200'
                      : `AED ${price}-${parseInt(price) + 49}`}
                  </span>
                </div>
                {isActive && <FontAwesomeIcon icon={faCheck} className="ms-auto text-success" />}
              </label>
            </div>
          );
        })}
      </div>
      
      <div>
        <h6 className="border-bottom pb-2">Customer Reviews</h6>
        {[4, 3, 2, 1].map((rating) => {
          const isActive = selectedRatings.includes(rating);
          return (
            <div key={rating} className="mb-2">
              <label className={classNames(
                "d-flex align-items-center p-2 rounded filter-option",
                { "active-filter": isActive }
              )}>
                <div className="form-check">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => handleRatingChange(rating)}
                    className="form-check-input"
                  />
                  <span className="form-check-label ms-2">
                    {Array.from({ length: rating }).map((_, index) => (
                      <FontAwesomeIcon key={index} icon={faStar} className="text-warning" />
                    ))}
                    & Up
                  </span>
                </div>
                {isActive && <FontAwesomeIcon icon={faCheck} className="ms-auto text-success" />}
              </label>
            </div>
          );
        })}
      </div>
      
      <style jsx>{`
        .sidebar-filter {
          border: 1px solid #e0e0e0;
        }
        .filter-option {
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .filter-option:hover {
          background-color: #f8f9fa;
        }
        .active-filter {
          background-color: #e8f5e9;
          border-left: 3px solid #28a745;
        }
      `}</style>
    </div>
  );
}

export default function SidebarFilterOptions(props: any) {
  return (
    <Suspense fallback={<div>Loading filters...</div>}>
      <SidebarFilterContent {...props} />
    </Suspense>
  );
}
