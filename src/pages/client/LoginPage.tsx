import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import ClientLayout from "@/components/client/ClientLayout";
import { toast } from "sonner";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      toast.success("Welcome back!");
      navigate("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const inputClass = "w-full px-4 py-3 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors";

  return (
    <ClientLayout>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="glass-card p-8 w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold">Welcome <span className="gold-text">Back</span></h1>
            <p className="text-muted-foreground text-sm mt-2">Sign in to your account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} />
            <input required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className={inputClass} />
            <button type="submit" className="w-full py-3 gold-gradient text-primary-foreground font-semibold rounded-lg tracking-wider uppercase text-sm">
              Sign In
            </button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </ClientLayout>
  );
};

export default LoginPage;
