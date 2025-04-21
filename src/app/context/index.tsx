'use client';
import React, { createContext, useReducer } from 'react';

// Define state type and action type for clarity
type CartStateType = {
  cartData: { id: number; quantity: number; price: number; title: string; image: string }[];
};
type CartActionType =
  | { type: 'ADD_TO_CART'; product: { id: number; quantity: number; price: number; title: string; image: string } }
  | { type: 'UPDATE_QUANTITY'; id: number; quantity: number }
  | { type: 'REMOVE_FROM_CART'; id: number }
  | { type: 'CLEAR_CART'; };

// Initial state for the cart
const initialState: CartStateType = {
  cartData: [],
};

// Reducer function to handle cart state updates
const reducer = (state: CartStateType, action: CartActionType) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingProductIndex = state.cartData.findIndex(
        (item) => item.id === action.product.id
      );
      if (existingProductIndex !== -1) {
        // Update quantity if product already exists
        return {
          ...state,
          cartData: [
            ...state.cartData.slice(0, existingProductIndex),
            { ...state.cartData[existingProductIndex], quantity: state.cartData[existingProductIndex].quantity + 1 },
            ...state.cartData.slice(existingProductIndex + 1),
          ],
        };
      } else {
        // Add new product with quantity 1
        return {
          ...state,
          cartData: [...state.cartData, { ...action.product, quantity: 1 }],
        };
      }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cartData: state.cartData.map((item) =>
          item.id === action.id ? { ...item, quantity: action.quantity } : item
        ),
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartData: state.cartData.filter((item) => item.id !== action.id),
      };
      case 'CLEAR_CART':
        return {
          ...state,
          cartData: [],
        };
    default:
      return state;
  }
};

// Create the CartContext with initial state and dispatch function
export const CartContext = createContext({
  cartData: initialState.cartData,
  addToCart: (product: { id: number; quantity: number; price: number; title: string; image: string }) => {},
  incrementQuantity: (id: number) => {},
  decrementQuantity: (id: number) => {},
  removeFromCart: (id: number) => {},
  clearCart: () => {},
});

// CartProvider component to manage cart state using useReducer
export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartState, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product: { id: number; quantity: number; price: number; title: string; image: string }) => {
    console.log('Adding product to cart:', product); 
    dispatch({ type: 'ADD_TO_CART', product });
  };

  const incrementQuantity = (id: number) => {
    console.log('Incrementing quantity for item with ID:', id);
    const existingItem = cartState.cartData.find((item) => item.id === id);
    const newQuantity = existingItem ? existingItem.quantity + 1 : 1;
    dispatch({ type: 'UPDATE_QUANTITY', id, quantity: newQuantity });
  };

  const decrementQuantity = (id: number) => {
    console.log('Decrementing quantity for item with ID:', id);
    const existingItem = cartState.cartData.find((item) => item.id === id);
    if (existingItem && existingItem.quantity > 1) {
      dispatch({ type: 'UPDATE_QUANTITY', id, quantity: existingItem.quantity - 1 });
    } else {
      removeFromCart(id);
    }
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value = {
    cartData: cartState.cartData,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}