'use client';
import React,{useContext} from 'react';
import classNames from 'classnames';
import styles from '../../styles/ProductCard.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles
import { CartContext } from '@/app/context/index';

interface AddToCartProps {
    product: any; // Replace any with a more specific type if possible
  }
export default function AddToCart({product}:AddToCartProps) {
  const { cartData, addToCart } = useContext(CartContext);

  return (
    <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault(); // Prevent default behavior (if applicable)
      console.log('Product to add:', product);
      addToCart(product);
      toast.success(`Added ${product.title} to the cart!`, {
      position: "top-right",
      autoClose: 2000,
      });
      console.log("cartData",cartData);
     
      }}
    className={classNames("btn btn-warning rounded-pill mb-2",styles.buttonTextSize)} >
              Add to Cart
            </button>
  )
}
