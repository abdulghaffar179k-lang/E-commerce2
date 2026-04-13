import React from "react";
import { useProducts } from "@/context/ProductContext";
import ClientLayout from "@/components/client/ClientLayout";
import { Link } from "react-router-dom";

const PackagesPage = () => {
  const { packages, products } = useProducts();

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold">Curated <span className="gold-text">Collections</span></h1>
          <p className="text-muted-foreground mt-2">Premium bundles handpicked for you</p>
        </div>

        {packages.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No collections available yet</p>
            <p className="text-sm mt-2">Check back soon for exclusive bundles</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {packages.map(pkg => {
              const pkgProducts = products.filter(p => pkg.productIds.includes(p.id));
              const originalTotal = pkgProducts.reduce((sum, p) => sum + p.price, 0);
              return (
                <div key={pkg.id} className="glass-card p-6 hover-lift">
                  <h2 className="flex items-start font-heading text-2xl font-bold mb-2">{pkg.name}</h2>
                  <p className="flex items-start text-muted-foreground text-sm mb-4">{pkg.description}</p>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {pkgProducts.map(p => (
                      <Link key={p.id} to={`/product/${p.id}`} className="flex items-center gap-2 glass-card px-3 py-2 hover:border-primary/30 transition-colors">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover" />
                        <div>
                          <p className="text-xs font-medium">{p.name}</p>
                          <p className="text-xs text-muted-foreground">${p.price.toLocaleString()}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="flex items-end gap-3">
                    <p className="text-3xl font-bold text-primary">${pkg.discountPrice.toLocaleString()}</p>
                    {originalTotal > pkg.discountPrice && (
                      <p className="text-muted-foreground line-through text-lg">${originalTotal.toLocaleString()}</p>
                    )}
                  </div>
                  <p className="flex items-start text-xs text-primary mt-1">Save ${(originalTotal - pkg.discountPrice).toLocaleString()}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </ClientLayout>
  );
};

export default PackagesPage;
