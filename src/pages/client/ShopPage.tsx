import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "@/components/client/ProductCard";
import ClientLayout from "@/components/client/ClientLayout";
import { categories, brands } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";

const ShopPage = () => {
  const { products } = useProducts();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = products.filter(p => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.brand.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (selectedBrand !== "All" && p.brand !== selectedBrand) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });

    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "name": result.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return result;
  }, [products, search, selectedCategory, selectedBrand, priceRange, sortBy]);

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="flex items-start font-heading text-4xl md:text-5xl font-bold">
            The <span className="gold-text">Collection</span>
          </h1>
          <p className="flex items-start text-muted-foreground mt-2">{filtered.length} pieces</p>
        </div>

        {/* Search & Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search luxury footwear..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-4 py-3 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="name">Name A-Z</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-lg text-sm"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-56 shrink-0 space-y-8`}>
            <div>
              <h3 className="flex items-start text-sm font-semibold tracking-widest uppercase mb-3 text-foreground">Category</h3>
              <div className="space-y-2">
                {categories.map(c => (
                  <button key={c} onClick={() => setSelectedCategory(c)}
                    className={`block text-sm w-full text-left px-3 py-2 rounded transition-colors ${selectedCategory === c ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="flex items-start text-sm font-semibold tracking-widest uppercase mb-3 text-foreground">Brand</h3>
              <div className="space-y-2">
                {brands.map(b => (
                  <button key={b} onClick={() => setSelectedBrand(b)}
                    className={`block text-sm w-full text-left px-3 py-2 rounded transition-colors ${selectedBrand === b ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                    {b}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="flex items-start text-sm font-semibold tracking-widest uppercase mb-3 text-foreground">Price Range</h3>
              <div className="space-y-2">
                {[[0, 500], [500, 1000], [1000, 2000], [2000, 5000]].map(([min, max]) => (
                  <button key={`${min}-${max}`}
                    onClick={() => setPriceRange([min, max])}
                    className={`block text-sm w-full text-left px-3 py-2 rounded transition-colors ${priceRange[0] === min && priceRange[1] === max ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                    ${min} — ${max.toLocaleString()}
                  </button>
                ))}
                <button onClick={() => setPriceRange([0, 5000])}
                  className="flex items-start text-xs text-primary hover:underline mt-1">
                  Clear price filter
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg">No products found</p>
                <p className="text-sm mt-2">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ShopPage;
