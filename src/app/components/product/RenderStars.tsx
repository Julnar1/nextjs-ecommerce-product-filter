import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

interface IRatingProps {
    rating: { rate: number; count: number };
  }

const RenderStars: React.FC<IRatingProps> = ({ rating }) =>{
//React.FC<IRatingProps> is a functional react component which receives props of data type IRatingProps
    const fullStars = Math.floor(rating.rate);
    const hasHalfStar = rating.rate % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-warning" />);
    }

    if (hasHalfStar) {
        stars.push(<FontAwesomeIcon key={fullStars} icon={faStarHalfAlt} className="text-warning" />);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
        stars.push(<FontAwesomeIcon key={fullStars + i + (hasHalfStar ? 1 : 0)} icon={faStar} className="text-secondary" />);
    }

    return stars;
};
export default RenderStars;
  