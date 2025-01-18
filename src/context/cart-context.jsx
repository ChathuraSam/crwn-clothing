import { createContext, useEffect, useState } from "react";

const addCartItems = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setCartOpen: () => {},
  cartItems: [],
  addItemsToCart: () => {},
  cartItemsCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const addItemsToCart = (item) => {
    setCartItems(addCartItems(cartItems, item));
  };

  useEffect(() => {
    // if you want to count the unique no of items
    // setCartItemsCount(cartItems.length);
    // if you want to count the total no of items
    setCartItemsCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemsToCart,
    cartItemsCount,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
