import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("luxe_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (email: string, _password: string) => {
    const users = JSON.parse(localStorage.getItem("luxe_users") || "[]");
    const found = users.find((u: any) => u.email === email);
    if (found) {
      setUser({ name: found.name, email: found.email });
      localStorage.setItem("luxe_user", JSON.stringify({ name: found.name, email: found.email }));
      return true;
    }
    // Mock: allow any login
    const mockUser = { name: email.split("@")[0], email };
    setUser(mockUser);
    localStorage.setItem("luxe_user", JSON.stringify(mockUser));
    return true;
  };

  const signup = (name: string, email: string, _password: string) => {
    const users = JSON.parse(localStorage.getItem("luxe_users") || "[]");
    users.push({ name, email });
    localStorage.setItem("luxe_users", JSON.stringify(users));
    const newUser = { name, email };
    setUser(newUser);
    localStorage.setItem("luxe_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("luxe_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
