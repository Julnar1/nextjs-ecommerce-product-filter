'use client';
import React,{ useContext,useEffect } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import CartItem from '../components/cart-item/CartItem';
// import OrderDetails from './OrderDetails';
// import Payment from './Payment';
// import { Row, Col } from 'react-bootstrap';
import { CartContext } from '../context/index';
import './Cart.css';

export default function Cart() {
  const { cartData } = useContext(CartContext);

  // Calculate subtotal
  const subTotal = cartData .reduce((acc, cartItem) => acc + (cartItem.price * cartItem.quantity), 0);
  console.log('Subtotal:', subTotal); // Log the calculated subtotal
  const total = subTotal + 25; // Add shipping cost
  console.log('Total:', total); // Log the calculated total
  useEffect(() => {
    console.log('Cart data updated:', cartData); // Log for debugging
  }, [cartData]); // Re-run effect whenever cartData changes

  return (
    <div className="container">
      <h2>My Cart</h2>
      {cartData.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row">
        <div className="col-md-8">
        <ul>
        <hr/>
              {cartData .map((cartItem) => (
                <CartItem key={cartItem.id} cartItem={cartItem} />
              ))}
            </ul>
            </div>
            <div className="col-md-4">
        <div className="card">
        <div className={"cart-totals"}>
    <h3>Cart Totals</h3>
    <div className={classNames("fw-bold","subtotal")}>
        <span>Subtotal:</span>
        <span className={"subtotal-amount"}>AED {subTotal.toFixed(2)}</span>
    </div>
    <div className={"shipping"}>
        <span>Shipping Cost:</span>
        <span className={"shipping-amount"}>AED 25.00</span>
    </div>
    <p className={classNames("text-start","shipping-note")}>Shipping options will be updated during <a className="text-decoration-none">checkout.</a></p>
    
    <a className={classNames("text-start text-decoration-none","calculate-shipping-link")}>Calculate Shipping Cost <FontAwesomeIcon icon={faChevronDown} /></a>
    <div className={classNames("fw-bold","total")}>
        <span>Total:</span>
        <span className={"total-amount"}>AED {total.toFixed(2)}</span>
    </div>
    <button className={"checkout-btn"}>Proceed to Checkout</button>
</div>
            {/* <OrderDetails subTotal={subTotal} total={total} /> */}
            {/* <Payment /> */}
            </div>
        </div>
        </div>
      )}
    </div>
  );
}

