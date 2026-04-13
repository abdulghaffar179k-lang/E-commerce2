import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const AdminLoginPage = () => {
  const { adminLogin } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(username, password)) {
      toast.success("Welcome, Admin");
      navigate("/admin");
    } else {
      toast.error("Invalid admin credentials");
    }
  };

  const inputClass = "w-full px-4 py-3 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="glass-card p-8 w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold"><span className="gold-text">Admin</span> Login</h1>
          <p className="text-muted-foreground text-sm mt-2">Enter your admin credentials</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className={inputClass} />
          <input required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className={inputClass} />
          <button type="submit" className="w-full py-3 gold-gradient text-primary-foreground font-semibold rounded-lg tracking-wider uppercase text-sm">
            Sign In
          </button>
        </form>
        <p className="text-center text-xs text-muted-foreground">Hint: admin / admin123</p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
