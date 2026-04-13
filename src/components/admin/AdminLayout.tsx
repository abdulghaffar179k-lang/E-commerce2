import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { LayoutDashboard, Package, PlusCircle, Boxes, LogOut, Menu, X, ChevronLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { to: "/admin/products", icon: Package, label: "Products" },
  { to: "/admin/products/add", icon: PlusCircle, label: "Add Product" },
  { to: "/admin/packages", icon: Boxes, label: "Packages" },
];

const AdminLayout = () => {
  const { adminLogout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string, exact?: boolean) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <Link to="/admin" className="font-heading text-xl font-bold">
          <span className="gold-text">LUXE</span><span className="text-foreground">SOLE</span>
          <span className="text-xs text-muted-foreground ml-2 font-body">Admin</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map(l => (
          <Link key={l.to} to={l.to} onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              isActive(l.to, l.exact) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}>
            <l.icon className="w-4 h-4" />
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-border space-y-2">
        <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
          <ChevronLeft className="w-4 h-4" /> Back to Store
        </Link>
        <button onClick={adminLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-secondary transition-all">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-64 bg-card border-r border-border shrink-0 sticky top-0 h-screen overflow-y-auto">
        {sidebar}
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-background/60 backdrop-blur-sm z-50" onClick={() => setSidebarOpen(false)} />
            <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="md:hidden fixed top-0 left-0 bottom-0 w-64 bg-card border-r border-border z-50">
              {sidebar}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden h-14 bg-card border-b border-border flex items-center px-4">
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-heading text-lg font-bold ml-3"><span className="gold-text">LUXE</span>SOLE Admin</span>
        </header>
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
