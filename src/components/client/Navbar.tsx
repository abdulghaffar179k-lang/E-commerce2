import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart, User, Menu, X, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { itemCount, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/packages", label: "Collections" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-heading text-2xl font-bold tracking-wider">
          <span className="gold-text">LUXE</span>
          <span className="text-foreground ml-1">SOLE</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link key={l.to} to={l.to} className="text-sm font-medium tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-300">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link to="/shop" className="p-2 text-muted-foreground hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </Link>
          <Link to="/wishlist" className="p-2 text-muted-foreground hover:text-primary transition-colors">
            <Heart className="w-5 h-5" />
          </Link>
          <button onClick={() => setIsCartOpen(true)} className="p-2 text-muted-foreground hover:text-primary transition-colors relative">
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </button>
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{user.name}</span>
              <button onClick={logout} className="text-xs text-primary hover:underline">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="hidden md:block p-2 text-muted-foreground hover:text-primary transition-colors">
              <User className="w-5 h-5" />
            </Link>
          )}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-foreground">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {links.map(l => (
                <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium tracking-widest uppercase text-muted-foreground hover:text-primary">
                  {l.label}
                </Link>
              ))}
              {user ? (
                <button onClick={() => { logout(); setMobileOpen(false); }} className="text-sm text-primary text-left">Logout</button>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)} className="text-sm text-primary">Sign In</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
