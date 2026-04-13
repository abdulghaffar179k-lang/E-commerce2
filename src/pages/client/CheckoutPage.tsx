import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import ClientLayout from "@/components/client/ClientLayout";
import { toast } from "sonner";

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || "", email: user?.email || "",
    address: "", city: "", zip: "", country: "",
    cardNumber: "", expiry: "", cvv: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) { toast.error("Your bag is empty"); return; }
    toast.success("Order placed successfully!");
    clearCart();
    navigate("/");
  };

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const inputClass = "w-full px-4 py-3 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors";

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-heading text-4xl font-bold mb-10">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 space-y-8">
            {/* Shipping */}
            <div className="glass-card p-6 space-y-4">
              <h2 className="flex items-start font-heading text-xl font-bold">Shipping Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input required placeholder="Full Name" value={form.name} onChange={e => update("name", e.target.value)} className={inputClass} />
                <input required type="email" placeholder="Email" value={form.email} onChange={e => update("email", e.target.value)} className={inputClass} />
              </div>
              <input required placeholder="Street Address" value={form.address} onChange={e => update("address", e.target.value)} className={inputClass} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input required placeholder="City" value={form.city} onChange={e => update("city", e.target.value)} className={inputClass} />
                <input required placeholder="ZIP Code" value={form.zip} onChange={e => update("zip", e.target.value)} className={inputClass} />
                <input required placeholder="Country" value={form.country} onChange={e => update("country", e.target.value)} className={inputClass} />
              </div>
            </div>

            {/* Payment */}
            <div className="glass-card p-6 space-y-4">
              <h2 className="flex items-start font-heading text-xl font-bold">Payment</h2>
              <input required placeholder="Card Number" value={form.cardNumber} onChange={e => update("cardNumber", e.target.value)} className={inputClass} />
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="MM/YY" value={form.expiry} onChange={e => update("expiry", e.target.value)} className={inputClass} />
                <input required placeholder="CVV" value={form.cvv} onChange={e => update("cvv", e.target.value)} className={inputClass} />
              </div>
            </div>

            <button type="submit"
              className="w-full py-4 gold-gradient text-primary-foreground font-semibold rounded-lg tracking-wider uppercase text-sm hover:opacity-90 transition-opacity">
              Place Order — ${total.toLocaleString()}
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6 sticky top-24 space-y-4">
              <h3 className="flex items-start font-heading text-lg font-bold">Order Summary</h3>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {items.map(item => (
                  <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <p className="flex items-start text-sm font-medium truncate">{item.name}</p>
                      <p className="flex items-start text-xs text-muted-foreground">Size {item.size} • {item.color} • x{item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${total.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-primary">Free</span></div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                  <span>Total</span><span className="text-primary">${total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </ClientLayout>
  );
};

export default CheckoutPage;
