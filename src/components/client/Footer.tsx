import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-card border-t border-border mt-20">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-heading text-xl font-bold mb-4">
            <span className="gold-text">LUXE</span><span className="text-foreground">SOLE</span>
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Crafting the future of luxury footwear. Every pair tells a story of excellence.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold tracking-widest uppercase mb-4 text-foreground">Shop</h4>
          <div className="flex flex-col gap-2">
            {["New Arrivals", "Sneakers", "Formal", "Boots"].map(l => (
              <Link key={l} to="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">{l}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold tracking-widest uppercase mb-4 text-foreground">Company</h4>
          <div className="flex flex-col gap-2">
            {["About Us", "Careers", "Press", "Sustainability"].map(l => (
              <span key={l} className="text-sm text-muted-foreground cursor-default">{l}</span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold tracking-widest uppercase mb-4 text-foreground">Support</h4>
          <div className="flex flex-col gap-2">
            {["Contact", "FAQ", "Shipping", "Returns"].map(l => (
              <span key={l} className="text-sm text-muted-foreground cursor-default">{l}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} LUXESOLE. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
