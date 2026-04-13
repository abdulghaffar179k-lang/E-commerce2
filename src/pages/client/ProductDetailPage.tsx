import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Heart, Minus, Plus, ArrowLeft } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import ClientLayout from "@/components/client/ClientLayout";
import { motion } from "framer-motion";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { getProduct, products } = useProducts();
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const product = getProduct(id || "");

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <ClientLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="font-heading text-2xl">Product not found</h2>
          <Link to="/shop" className="text-primary mt-4 inline-block">Back to shop</Link>
        </div>
      </ClientLayout>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
  };

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <ClientLayout>
      <div className="flex flex-col items-start container mx-auto px-4 py-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-card">
              <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${i === selectedImage ? 'border-primary' : 'border-border'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <p className="flex items-start text-primary text-sm tracking-widest uppercase mb-1">{product.brand}</p>
              <h1 className="flex items-start font-heading text-3xl md:text-4xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-primary text-primary' : 'text-muted'}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews.length} reviews)</span>
              </div>
            </div>

            <p className="flex items-start text-3xl font-bold text-primary">${product.price.toLocaleString()}</p>
            <p className="text-start  text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Size */}
            <div>
              <h3 className="flex items-start text-sm font-semibold tracking-widest uppercase mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)}
                    className={`w-12 h-12 rounded-md border text-sm font-medium transition-all ${selectedSize === s ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground hover:border-primary'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <h3 className="flex items-start text-sm font-semibold tracking-widest uppercase mb-3">Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map(c => (
                  <button key={c} onClick={() => setSelectedColor(c)}
                    className={`px-4 py-2 rounded-md border text-sm transition-all ${selectedColor === c ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground hover:border-primary'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-md">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-secondary transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-secondary transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor}
                className="flex-1 py-4 gold-gradient text-primary-foreground font-semibold rounded-lg tracking-wider uppercase text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity">
                Add to Bag
              </button>
              <button onClick={() => toggleWishlist(product.id)}
                className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
                <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-primary text-primary' : 'text-foreground'}`} />
              </button>
            </div>
            {(!selectedSize || !selectedColor) && (
              <p className="text-xs text-muted-foreground">Please select a size and color</p>
            )}

            {/* Reviews */}
            <div className="pt-8 border-t border-border">
              <h3 className=" flex items-start font-heading text-xl font-bold mb-4">Reviews</h3>
              <div className="space-y-4">
                {product.reviews.map((r, i) => (
                  <div key={i} className="glass-card p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className={`w-3 h-3 ${j < r.rating ? 'fill-primary text-primary' : 'text-muted'}`} />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{r.user}</span>
                      <span className="text-xs text-muted-foreground">{r.date}</span>
                    </div>
                    <p className="flex items-start text-sm text-muted-foreground">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-heading text-2xl font-bold mb-8">You May Also <span className="gold-text">Love</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Link to={`/product/${p.id}`} className="group block">
                    <div className="aspect-[3/4] rounded-lg overflow-hidden bg-card mb-3">
                      <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <p className="flex items-start text-xs text-muted-foreground tracking-widest uppercase">{p.brand}</p>
                    <h4 className="flex items-start font-heading font-semibold group-hover:text-primary transition-colors">{p.name}</h4>
                    <p className="flex items-start text-primary font-semibold">${p.price.toLocaleString()}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ClientLayout>
  );
};

export default ProductDetailPage;
