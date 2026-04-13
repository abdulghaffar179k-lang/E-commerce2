import auth from "@/Services/auth/auth";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
  adminLogin: (username: string, password: string) => boolean;
  adminLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("luxe_user");
    if (saved) setUser(JSON.parse(saved));
    setIsAdmin(localStorage.getItem("luxe_admin") === "true");
  }, []);

  const login = (email: string, password: string) => {
    if (!email || !password) return false;
    const users = JSON.parse(localStorage.getItem("luxe_users") || "[]");
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (found) {
      const u = { id: found.id, name: found.name, email: found.email };
      setUser(u);
      localStorage.setItem("luxe_user", JSON.stringify(u));
      return true;
    }
    return false;
  };

  // async function login(
  //   email: string,
  //   password: string
  // ): Promise<boolean> {
  //   try {
  //     if (!email || !password) return false;

  //     const res = await fetch("http://localhost:3000/api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });



  //     if (!res.ok) {
  //       return false;
  //     }

  //     const data = await res.json();
  //     const found = data.find((u: any) => u.email === email && u.password === password);
  //     if (found) {

  //       // assume backend returns user object
  //       const user: any = {
  //         id: data.id,
  //         name: found.name,
  //         email: data.email,
  //       };

  //       setUser(user);
  //       localStorage.setItem("luxe_user", JSON.stringify(user));
  //       return true;
  //     }
  //     console.log(data.message);


  //     return false;
  //   } catch (error) {
  //     console.error("Signup error:", error);
  //     return false;
  //   }
  // }

  // async function signup(
  //   name: string,
  //   email: string,
  //   password: string
  // ): Promise<boolean> {
  //   try {
  //     if (!name || !email || !password) return false;

  //     const res = await fetch("http://localhost:3000/api/signUp", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ name, email, password }),
  //     });

  //     if (!res.ok) {
  //       return false;
  //     }

  //     const data = await res.json();

  //     // assume backend returns user object
  //     const user = {
  //       id: data.id,
  //       name: data.name,
  //       email: data.email,
  //     };

  //     setUser(user);
  //     localStorage.setItem("luxe_user", JSON.stringify(user));

  //     return true;
  //   } catch (error) {
  //     console.error("Signup error:", error);
  //     return false;
  //   }
  // }

  const signup = (name: string, email: string, password: string) => {
    // logic here
    if (!name || !email || !password) return false;
    const users = JSON.parse(localStorage.getItem("luxe_users") || "[]");
    if (users.find((u: any) => u.email === email)) return false;
    const newUser = { id: Date.now().toString(), name, email, password };
    users.push(newUser);
    localStorage.setItem("luxe_users", JSON.stringify(users));
    const u = { id: newUser.id, name, email };
    setUser(u);
    localStorage.setItem("luxe_user", JSON.stringify(u));
    return true;
  };

  // async function signup(name: string, email: string, password: string): Promise<boolean> {
  //   if (!name || !email || !password) {
  //     return false;
  //   }

  //   try {
  //     const res = await auth(name, email, password);
  //     console.log(res);

  //     // agar token nahi aya to signup fail
  //     if (!res?.token) {
  //       throw new Error(res?.message || "Signup failed");
  //     }

  //     // user object safely banaya
  //     const user = {
  //       id: res.user?.id ?? "",
  //       name: res.user?.name ?? name,
  //       email: res.user?.email ?? email,
  //     };

  //     // state + localStorage update
  //     setUser(user);
  //     localStorage.setItem("luxe_user", JSON.stringify(user));
  //     localStorage.setItem("userToken", res.token);

  //     return true;

  //   } catch (error: any) {
  //     console.log("Signup error:", error);

  //     // optional: error message bhi store kar sakte ho
  //     return false;
  //   }
  // }

  const logout = () => {
    setUser(null);
    localStorage.removeItem("luxe_user");
  };

  const adminLogin = (username: string, password: string) => {
    if (username === "admin" && password === "admin123") {
      setIsAdmin(true);
      localStorage.setItem("luxe_admin", "true");
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("luxe_admin");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAdmin, adminLogin, adminLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
