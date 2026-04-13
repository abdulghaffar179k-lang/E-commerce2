import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useProducts } from "@/context/ProductContext";

const AdminProducts = () => {
  const { products, deleteProduct } = useProducts();
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const confirmDelete = () => {
    if (deleteId) { deleteProduct(deleteId); setDeleteId(null); }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="font-heading text-3xl font-bold">Products</h1>
        <Link to="/admin/products/add"
          className="inline-flex items-center gap-2 px-6 py-3 gold-gradient text-primary-foreground font-semibold rounded-lg text-sm tracking-wider uppercase">
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-xs font-semibold tracking-widest uppercase text-muted-foreground">Product</th>
                <th className="text-left p-4 text-xs font-semibold tracking-widest uppercase text-muted-foreground hidden sm:table-cell">Brand</th>
                <th className="text-left p-4 text-xs font-semibold tracking-widest uppercase text-muted-foreground hidden md:table-cell">Category</th>
                <th className="text-left p-4 text-xs font-semibold tracking-widest uppercase text-muted-foreground">Price</th>
                <th className="text-right p-4 text-xs font-semibold tracking-widest uppercase text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover" />
                      <span className="font-medium text-sm truncate max-w-[200px]">{p.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground hidden sm:table-cell">{p.brand}</td>
                  <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">{p.category}</td>
                  <td className="p-4 text-sm font-semibold text-primary">${p.price.toLocaleString()}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/products/edit/${p.id}`}
                        className="p-2 rounded hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button onClick={() => setDeleteId(p.id)}
                        className="p-2 rounded hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card p-6 w-full max-w-sm space-y-4">
            <h3 className="font-heading text-lg font-bold">Delete Product?</h3>
            <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2 border border-border rounded-lg text-sm hover:bg-secondary transition-colors">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 py-2 bg-destructive text-destructive-foreground rounded-lg text-sm font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
