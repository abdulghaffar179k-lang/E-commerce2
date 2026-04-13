import React from "react";
import { Link } from "react-router-dom";
import { Heart, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import ClientLayout from "@/components/client/ClientLayout";

const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useCart();
  const { products } = useProducts();
  const wishedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-heading text-4xl font-bold mb-10">
          <Heart className="inline w-8 h-8 text-primary mr-2" />
          Wish<span className="gold-text">list</span>
        </h1>
        {wishedProducts.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">Your wishlist is empty</p>
            <Link to="/shop" className="inline-block mt-4 text-primary hover:underline">Explore the collection</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishedProducts.map(p => (
              <div key={p.id} className="group relative">
                <button onClick={() => toggleWishlist(p.id)} className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/60 backdrop-blur-sm hover:bg-destructive/20">
                  <X className="w-4 h-4" />
                </button>
                <Link to={`/product/${p.id}`} className="block">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden bg-card mb-3">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <p className="text-xs text-muted-foreground tracking-widest uppercase">{p.brand}</p>
                  <h3 className="font-heading font-semibold group-hover:text-primary transition-colors">{p.name}</h3>
                  <p className="text-primary font-semibold">${p.price.toLocaleString()}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </ClientLayout>
  );
};

export default WishlistPage;
