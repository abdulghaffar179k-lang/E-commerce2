import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: number;
  color: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, size: number, color: string) => void;
  updateQuantity: (productId: string, size: number, color: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("luxe_cart");
    if (saved) setItems(JSON.parse(saved));
    const wl = localStorage.getItem("luxe_wishlist");
    if (wl) setWishlist(JSON.parse(wl));
  }, []);

  useEffect(() => { localStorage.setItem("luxe_cart", JSON.stringify(items)); }, [items]);
  useEffect(() => { localStorage.setItem("luxe_wishlist", JSON.stringify(wishlist)); }, [wishlist]);

  const addToCart = (item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === item.productId && i.size === item.size && i.color === item.color);
      if (existing) {
        toast.success("Updated quantity in cart");
        return prev.map(i => i === existing ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      toast.success("Added to cart");
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: number, color: string) => {
    setItems(prev => prev.filter(i => !(i.productId === productId && i.size === size && i.color === color)));
    toast.info("Removed from cart");
  };

  const updateQuantity = (productId: string, size: number, color: string, qty: number) => {
    if (qty <= 0) return removeFromCart(productId, size, color);
    setItems(prev => prev.map(i =>
      i.productId === productId && i.size === size && i.color === color ? { ...i, quantity: qty } : i
    ));
  };

  const clearCart = () => { setItems([]); };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        toast.info("Removed from wishlist");
        return prev.filter(id => id !== productId);
      }
      toast.success("Added to wishlist");
      return [...prev, productId];
    });
  };

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount, isCartOpen, setIsCartOpen, wishlist, toggleWishlist }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
