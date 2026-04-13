import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";
import { categories, brands } from "@/data/products";

const AdminEditProduct = () => {
  const { id } = useParams();
  const { getProduct, updateProduct } = useProducts();
  const navigate = useNavigate();
  const product = getProduct(id || "");

  const [form, setForm] = useState({
    name: "", brand: "", price: "", category: "",
    sizes: [] as number[], colors: "", description: "", image: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name, brand: product.brand, price: product.price.toString(),
        category: product.category, sizes: product.sizes, colors: product.colors.join(", "),
        description: product.description, image: product.image,
      });
    }
  }, [product]);

  if (!product) {
    return <div className="text-center py-20 text-muted-foreground">Product not found</div>;
  }

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
    updateProduct(product.id, {
      name: form.name, brand: form.brand, price: Number(form.price),
      category: form.category, sizes: form.sizes,
      colors: form.colors.split(",").map(c => c.trim()).filter(Boolean),
      description: form.description, image: form.image,
      images: [form.image],
    });
    navigate("/admin/products");
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-3xl font-bold mb-8">Edit Product</h1>
      <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5">
        <div>
          <label className="text-sm font-medium mb-1 block">Product Name</label>
          <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Brand</label>
            <select value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} className={inputClass}>
              {brands.filter(b => b !== "All").map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Category</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inputClass}>
              {categories.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Price ($)</label>
          <input required type="number" min="1" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Sizes</label>
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
          <label className="text-sm font-medium mb-1 block">Colors (comma-separated)</label>
          <input required value={form.colors} onChange={e => setForm({ ...form, colors: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Description</label>
          <textarea required rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Image URL</label>
          <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className={inputClass} />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={() => navigate("/admin/products")} className="flex-1 py-3 border border-border rounded-lg text-sm hover:bg-secondary transition-colors">Cancel</button>
          <button type="submit" className="flex-1 py-3 gold-gradient text-primary-foreground font-semibold rounded-lg text-sm tracking-wider uppercase">Update Product</button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditProduct;
