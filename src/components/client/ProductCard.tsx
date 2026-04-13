import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const { wishlist, toggleWishlist } = useCart();
  const isWished = wishlist.includes(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-card aspect-[3/4] mb-4">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className=" w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
            className="absolute top-3 right-3 p-2 rounded-full bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all"
          >
            <Heart className={`w-4 h-4 ${isWished ? "fill-primary text-primary" : "text-foreground"}`} />
          </button>
          {product.featured && (
            <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold tracking-wider uppercase gold-gradient text-primary-foreground rounded-full">
              Featured
            </span>
          )}
        </div>
        <div className="space-y-1">
          <p className="flex items-start text-xs text-muted-foreground tracking-widest uppercase">{product.brand}</p>
          <h3 className="flex items-start font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="flex items-start text-primary font-semibold">${product.price.toLocaleString()}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
