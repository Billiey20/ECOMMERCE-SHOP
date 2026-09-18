import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {

    case 'ADD_ITEM': {
      const { variantId, productId, title, variantTitle, price, sku } = action.payload;
      const existing = state.items.find(i => i.variantId === variantId);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.variantId === variantId ? { ...i, quantity: i.quantity + 1 } : i
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { variantId, productId, title, variantTitle, price, sku, quantity: 1 }]
      };
    }

    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.variantId !== action.payload) };

    case 'UPDATE_QTY': {
      const { variantId, quantity } = action.payload;
      if (quantity <= 0) return { ...state, items: state.items.filter(i => i.variantId !== variantId) };
      return {
        ...state,
        items: state.items.map(i => i.variantId === variantId ? { ...i, quantity } : i)
      };
    }

    case 'CLEAR_CART':
      return { ...state, items: [] };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem    = (payload) => dispatch({ type: 'ADD_ITEM',    payload });
  const removeItem = (variantId) => dispatch({ type: 'REMOVE_ITEM', payload: variantId });
  const updateQty  = (variantId, quantity) => dispatch({ type: 'UPDATE_QTY', payload: { variantId, quantity } });
  const clearCart  = () => dispatch({ type: 'CLEAR_CART' });

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal   = state.items.reduce((sum, i) => sum + parseFloat(i.price) * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, updateQty, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
