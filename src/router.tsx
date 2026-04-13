import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import HomePage from "@/pages/client/HomePage";
import ShopPage from "@/pages/client/ShopPage";
import ProductDetailPage from "@/pages/client/ProductDetailPage";
import CartPage from "@/pages/client/CartPage";
import CheckoutPage from "@/pages/client/CheckoutPage";
import LoginPage from "@/pages/client/LoginPage";
import SignupPage from "@/pages/client/SignupPage";
import WishlistPage from "@/pages/client/WishlistPage";
import PackagesPage from "@/pages/client/PackagesPage";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminAddProduct from "@/pages/admin/AdminAddProduct";
import AdminEditProduct from "@/pages/admin/AdminEditProduct";
import AdminPackages from "@/pages/admin/AdminPackages";
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import { useAuth } from './context/AuthContext';

import NotFound from "./pages/NotFound";

export default function AppRouter() {

    const AdminGuard = ({ children }: { children: React.ReactNode }) => {
        const { isAdmin } = useAuth();
        if (!isAdmin) return <Navigate to="/admin/login" replace />;
        return <>{children}</>;
    };

    return (
        <Routes>
            {/* Client */}
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/packages" element={<PackagesPage />} />

            {/* Admin */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="products/add" element={<AdminAddProduct />} />
                <Route path="products/edit/:id" element={<AdminEditProduct />} />
                <Route path="packages" element={<AdminPackages />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
