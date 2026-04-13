import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";

const ClientLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <CartDrawer />
    <main className="pt-16">{children}</main>
    <Footer />
  </div>
);

export default ClientLayout;
