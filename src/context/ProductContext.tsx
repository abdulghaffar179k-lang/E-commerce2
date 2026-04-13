import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, Package, defaultProducts } from "@/data/products";
import { toast } from "sonner";

interface ProductContextType {
  products: Product[];
  packages: Package[];
  addProduct: (p: Omit<Product, "id" | "rating" | "reviews">) => void;
  updateProduct: (id: string, p: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  addPackage: (pkg: Omit<Package, "id">) => void;
  updatePackage: (id: string, pkg: Partial<Package>) => void;
  deletePackage: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("luxe_products");
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      setProducts(defaultProducts);
      localStorage.setItem("luxe_products", JSON.stringify(defaultProducts));
    }
    const pkgs = localStorage.getItem("luxe_packages");
    if (pkgs) setPackages(JSON.parse(pkgs));
  }, []);

  useEffect(() => { if (products.length) localStorage.setItem("luxe_products", JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem("luxe_packages", JSON.stringify(packages)); }, [packages]);

  const addProduct = (p: Omit<Product, "id" | "rating" | "reviews">) => {
    const newP: Product = { ...p, id: Date.now().toString(), rating: 0, reviews: [] };
    setProducts(prev => [...prev, newP]);
    toast.success("Product added");
  };

  const updateProduct = (id: string, p: Partial<Product>) => {
    setProducts(prev => prev.map(prod => prod.id === id ? { ...prod, ...p } : prod));
    toast.success("Product updated");
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast.success("Product deleted");
  };

  const getProduct = (id: string) => products.find(p => p.id === id);

  const addPackage = (pkg: Omit<Package, "id">) => {
    setPackages(prev => [...prev, { ...pkg, id: Date.now().toString() }]);
    toast.success("Package created");
  };

  const updatePackage = (id: string, pkg: Partial<Package>) => {
    setPackages(prev => prev.map(p => p.id === id ? { ...p, ...pkg } : p));
    toast.success("Package updated");
  };

  const deletePackage = (id: string) => {
    setPackages(prev => prev.filter(p => p.id !== id));
    toast.success("Package deleted");
  };

  return (
    <ProductContext.Provider value={{ products, packages, addProduct, updateProduct, deleteProduct, getProduct, addPackage, updatePackage, deletePackage }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used within ProductProvider");
  return ctx;
};
