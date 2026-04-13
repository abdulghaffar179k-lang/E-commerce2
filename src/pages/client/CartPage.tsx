import React from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, X, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ClientLayout from "@/components/client/ClientLayout";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();

  return (
    <ClientLayout>
      <div className="flex flex-col items-start container mx-auto px-4 py-12">
        <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 text-sm">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>

        <h1 className="flex items-start font-heading text-4xl font-bold mb-10">Shopping <span className="gold-text">Bag</span></h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-20 h-20 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-xl text-muted-foreground">Your bag is empty</p>
            <Link to="/shop" className="inline-block mt-6 px-8 py-3 gold-gradient text-primary-foreground rounded-lg tracking-wider uppercase text-sm font-semibold">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="min-w-[100%] grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {items.map(item => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="glass-card p-4 flex gap-4">
                  <img src={item.image} alt={item.name} className="w-28 h-28 object-cover rounded-md" />
                  <div className="flex-1 min-w-0">
                    <h3 className="flex items-start flex items-start font-heading font-semibold text-lg">{item.name}</h3>
                    <p className="flex items-start text-sm text-muted-foreground">Size: {item.size} • {item.color}</p>
                    <p className="flex items-start text-primary font-semibold mt-2">${item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <button onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                        className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                        className="w-8 h-8 rounded border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeFromCart(item.productId, item.size, item.color)} className="text-muted-foreground hover:text-destructive">
                      <X className="w-5 h-5" />
                    </button>
                    <p className="font-semibold">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card p-6 h-fit sticky top-24 space-y-6">
              <h3 className="font-heading text-xl font-bold">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${total.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-primary">Free</span></div>
                <div className="border-t border-border pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span><span className="text-primary">${total.toLocaleString()}</span>
                </div>
              </div>
              <Link to="/checkout"
                className="block w-full py-4 text-center gold-gradient text-primary-foreground font-semibold rounded-lg tracking-wider uppercase text-sm">
                Proceed to Checkout
              </Link>
              <button onClick={clearCart} className="w-full text-center text-sm text-muted-foreground hover:text-destructive transition-colors">
                Clear Bag
              </button>
            </div>
          </div>
        )}
      </div>
    </ClientLayout>
  );
};

export default CartPage;
