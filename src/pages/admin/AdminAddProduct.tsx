import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";
import { categories, brands } from "@/data/products";

const AdminAddProduct = () => {
  const { addProduct } = useProducts();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", brand: brands[1], price: "", category: categories[1],
    sizes: [] as number[], colors: "", description: "", image: "",
  });

  const allSizes = [36,37,38,39,40,41,42,43,44,45,46];
  const inputClass = "w-full px-4 py-3 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors";

  const toggleSize = (s: number) => {
    setForm(prev => ({
      ...prev,
      sizes: prev.sizes.includes(s) ? prev.sizes.filter(x => x !== s) : [...prev.sizes, s],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name: form.name,
      brand: form.brand,
      price: Number(form.price),
      category: form.category,
      sizes: form.sizes,
      colors: form.colors.split(",").map(c => c.trim()).filter(Boolean),
      description: form.description,
      image: form.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      images: [form.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80"],
      featured: false,
    });
    navigate("/admin/products");
  };

  return (
    <div className="max-w-full">
      <h1 className="font-heading text-3xl font-bold mb-8">Add Product</h1>
      <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5">
        <div>
          <label className="flex items-start text-sm font-medium mb-1 block">Product Name</label>
          <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="e.g. Royal Gold Edition" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-start text-sm font-medium mb-1 block">Brand</label>
            <select value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} className={inputClass}>
              {brands.filter(b => b !== "All").map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="flex items-start text-sm font-medium mb-1 block">Category</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inputClass}>
              {categories.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="flex items-start text-sm font-medium mb-1 block">Price ($)</label>
          <input required type="number" min="1" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className={inputClass} placeholder="899" />
        </div>
        <div>
          <label className="flex items-start text-sm font-medium mb-2 block">Sizes</label>
          <div className="flex flex-wrap gap-2">
            {allSizes.map(s => (
              <button key={s} type="button" onClick={() => toggleSize(s)}
                className={`w-10 h-10 rounded border text-sm font-medium transition-all ${form.sizes.includes(s) ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground hover:border-primary'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="flex items-start text-sm font-medium mb-1 block">Colors (comma-separated)</label>
          <input required value={form.colors} onChange={e => setForm({ ...form, colors: e.target.value })} className={inputClass} placeholder="Black, Gold, White" />
        </div>
        <div>
          <label className="flex items-start text-sm font-medium mb-1 block">Description</label>
          <textarea required rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={inputClass} placeholder="Premium luxury shoe..." />
        </div>
        <div>
          <label className="flex items-start text-sm font-medium mb-1 block">Image URL</label>
          <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className={inputClass} placeholder="https://..." />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={() => navigate("/admin/products")} className="flex-1 py-3 border border-border rounded-lg text-sm hover:bg-secondary transition-colors">Cancel</button>
          <button type="submit" className="flex-1 py-3 gold-gradient text-primary-foreground font-semibold rounded-lg text-sm tracking-wider uppercase">Save Product</button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddProduct;
