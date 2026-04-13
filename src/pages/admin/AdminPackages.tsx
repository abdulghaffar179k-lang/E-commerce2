import React, { useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";
import { useProducts } from "@/context/ProductContext";

const AdminPackages = () => {
  const { packages, products, addPackage, deletePackage } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", productIds: [] as string[], discountPrice: "" });

  const inputClass = "w-full px-4 py-3 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors";

  const toggleProduct = (id: string) => {
    setForm(prev => ({
      ...prev,
      productIds: prev.productIds.includes(id) ? prev.productIds.filter(x => x !== id) : [...prev.productIds, id],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPackage({
      name: form.name,
      description: form.description,
      productIds: form.productIds,
      discountPrice: Number(form.discountPrice),
      image: products.find(p => form.productIds.includes(p.id))?.image || "",
    });
    setForm({ name: "", description: "", productIds: [], discountPrice: "" });
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl font-bold">Packages</h1>
        <button onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-6 py-3 gold-gradient text-primary-foreground font-semibold rounded-lg text-sm tracking-wider uppercase">
          <Plus className="w-4 h-4" /> Create Package
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="min-w-[100%] glass-card p-6 space-y-5 mb-8 max-w-2xl">
          <div>
            <label className="flex items-start  text-sm font-medium mb-1 block">Package Name</label>
            <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="e.g. Sports Combo Pack" />
          </div>
          <div>
            <label className="flex items-start text-sm font-medium mb-1 block">Description</label>
            <textarea rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={inputClass} placeholder="A premium bundle..." />
          </div>
          <div>
            <label className="flex items-start text-sm font-medium mb-2 block">Select Products</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {products.map(p => (
                <button key={p.id} type="button" onClick={() => toggleProduct(p.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg border text-left text-sm transition-all ${
                    form.productIds.includes(p.id) ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                  }`}>
                  <img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover" />
                  <div className="min-w-0">
                    <p className="font-medium truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">${p.price.toLocaleString()}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="flex items-start text-sm font-medium mb-1 block">Bundle Price ($)</label>
            <input required type="number" min="1" value={form.discountPrice} onChange={e => setForm({ ...form, discountPrice: e.target.value })} className={inputClass} />
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 border border-border rounded-lg text-sm">Cancel</button>
            <button type="submit" className="flex-1 py-3 gold-gradient text-primary-foreground font-semibold rounded-lg text-sm tracking-wider uppercase">Create</button>
          </div>
        </form>
      )}

      {packages.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p>No packages yet. Create your first bundle!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packages.map(pkg => {
            const pkgProducts = products.filter(p => pkg.productIds.includes(p.id));
            return (
              <div key={pkg.id} className="glass-card p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-heading text-xl font-bold">{pkg.name}</h3>
                  <button onClick={() => deletePackage(pkg.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="flex items-start text-sm text-muted-foreground mb-3">{pkg.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {pkgProducts.map(p => (
                    <div key={p.id} className="flex items-center gap-2 bg-secondary rounded px-2 py-1">
                      <img src={p.image} alt={p.name} className="w-6 h-6 rounded object-cover" />
                      <span className="text-xs">{p.name}</span>
                    </div>
                  ))}
                </div>
                <p className="flex items-start text-2xl font-bold text-primary">${pkg.discountPrice.toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminPackages;
