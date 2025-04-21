import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/index';
import { useContext } from 'react';

interface CartItemProps {
  cartItem: {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
  };
}

const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  const { incrementQuantity, decrementQuantity, removeFromCart } = useContext(CartContext);

  return (
    <>
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <img src={cartItem.image} height={80} alt={cartItem.title} className="cart-item-image" />
        <div className="ms-3">
          <h6 className="mb-0">{cartItem.title}</h6>
          <p className="mb-0 text-start text-secondary">
            AED {typeof cartItem.price === 'number' ? cartItem.price.toFixed(2) : '0.00'} 
            <span className="text-dark">*{cartItem.quantity}</span>
          </p>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <button 
          className="btn btn-sm btn-outline-secondary" 
          onClick={() => {console.log(`Decrementing quantity for item with ID: ${cartItem.id}`);
          if (cartItem.quantity > 1) {
            decrementQuantity(cartItem.id);
          } else {
            removeFromCart(cartItem.id);
          }}}
        >
          -
        </button>
        <span className="mx-2">{cartItem.quantity}</span>
        <button 
          className="btn btn-sm btn-outline-secondary" 
          onClick={() => {
            console.log(`Incrementing quantity for item with ID: ${cartItem.id}`);
            incrementQuantity(cartItem.id);
          }}
        >
          +
        </button>
        <button 
          className="btn btn-sm text-danger ms-3 fs-5" 
          onClick={() => removeFromCart(cartItem.id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
     
    </li>
     <hr/>
     </>
  );
};

export default CartItem;