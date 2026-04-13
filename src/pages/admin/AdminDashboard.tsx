import React from "react";
import { Package, ShoppingBag, Users, TrendingUp } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const { products, packages } = useProducts();

  const stats = [
    { label: "Total Products", value: products.length, icon: Package, color: "text-primary" },
    { label: "Total Orders", value: 156, icon: ShoppingBag, color: "text-green-400" },
    { label: "Total Users", value: 2834, icon: Users, color: "text-blue-400" },
    { label: "Revenue", value: "$48,290", icon: TrendingUp, color: "text-primary" },
  ];

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <s.icon className={`w-8 h-8 ${s.color}`} />
            </div>
            <p className="flex items-start text-2xl font-bold">{s.value}</p>
            <p className="flex items-start text-sm text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-6">
        <h2 className="font-heading text-xl font-bold mb-4">Recent Products</h2>
        <div className=" space-y-3">
          {products.slice(0, 5).map(p => (
            <div key={p.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
              <img src={p.image} alt={p.name} className="w-12 h-12 rounded-md object-cover" />
              <div className="flex-1 min-w-0">
                <p className="flex items-start font-medium text-sm truncate">{p.name}</p>
                <p className="flex items-start text-xs text-muted-foreground">{p.brand} • {p.category}</p>
              </div>
              <p className="text-primary font-semibold">${p.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
