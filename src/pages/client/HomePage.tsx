import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "@/components/client/ProductCard";
import ClientLayout from "@/components/client/ClientLayout";
import { motion } from "framer-motion";
import { categories } from "@/data/products";

const HomePage = () => {
  const { products, packages } = useProducts();
  const featured = products.filter(p => p.featured).slice(0, 4);

  return (


    <ClientLayout>
      
      {/* Hero */}
      <section className=" min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1600&q=80"
            alt="Luxury shoes"
            className="w-full h-full object-cover opacity-40"
          />
          <div className=" absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        </div>
        <div className="container mx-auto px-4 relative z-10 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4 font-medium">New Collection 2024</p>
            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight mb-6">
              Walk in <br /><span className="gold-text">Luxury</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md leading-relaxed">
              Discover our curated collection of the world's most exclusive footwear. Where craftsmanship meets contemporary design.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 gold-gradient text-primary-foreground font-semibold rounded-lg tracking-wider uppercase text-sm hover:opacity-90 transition-opacity">
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/packages"
                className="inline-flex items-center gap-2 px-8 py-4 border border-primary text-primary font-semibold rounded-lg tracking-wider uppercase text-sm hover:bg-primary hover:text-primary-foreground transition-all">
                View Collections
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className=" py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">Shop by <span className="gold-text">Category</span></h2>
            <p className="text-muted-foreground">Find your perfect pair</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.filter(c => c !== "All").map((cat, i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/shop?category=${cat}`}
                  className="glass-card px-8 py-4 text-sm tracking-widest uppercase font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 block">
                  {cat}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20 bg-card/30 ">
        <div className=" container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold">Featured <span className="gold-text">Pieces</span></h2>
              <p className="text-muted-foreground mt-2">Hand-selected exclusives</p>
            </div>
            <Link to="/shop" className="text-primary text-sm tracking-wider uppercase flex items-center gap-2 hover:gap-3 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Packages/Collections */}
      {packages.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
              Curated <span className="gold-text">Collections</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map(pkg => (
                <div key={pkg.id} className="glass-card p-6 hover-lift">
                  <h3 className="font-heading text-xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{pkg.description}</p>
                  <p className="text-primary text-2xl font-bold">${pkg.discountPrice.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">{pkg.productIds.length} items included</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial band */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-primary text-primary" />)}
          </div>
          <blockquote className="font-heading text-2xl md:text-3xl italic text-foreground max-w-2xl mx-auto mb-4">
            "The finest footwear I've ever owned. LUXESOLE delivers an experience, not just a product."
          </blockquote>
          <p className="text-muted-foreground text-sm tracking-widest uppercase">— Victoria L., London</p>
        </div>
      </section>
    </ClientLayout>
  );
};

export default HomePage;
