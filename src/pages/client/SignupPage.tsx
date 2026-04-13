import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import ClientLayout from "@/components/client/ClientLayout";
import { toast } from "sonner";

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (await signup(name, email, password)) {
      toast.success("Account created!");
      navigate("/");
    } else {
      toast.error("Email already exists");
    }
  };

  const inputClass = "w-full px-4 py-3 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors";

  return (
    <ClientLayout>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="glass-card p-8 w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold">Create <span className="gold-text">Account</span></h1>
            <p className="text-muted-foreground text-sm mt-2">Join the luxury experience</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input required placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className={inputClass} />
            <input required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} />
            <input required type="password" placeholder="Password" minLength={6} value={password} onChange={e => setPassword(e.target.value)} className={inputClass} />
            <button type="submit" className="w-full py-3 gold-gradient text-primary-foreground font-semibold rounded-lg tracking-wider uppercase text-sm">
              Create Account
            </button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </ClientLayout>
  );
};

export default SignupPage;
