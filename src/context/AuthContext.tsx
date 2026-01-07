import React, { createContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "CLIENT" | "ADMIN" | "EMPLOYEE";
  photoUrl?: string; // <- foto do perfil
}

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  updateUserPhoto: (url: string) => void; // <- ADICIONADO
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
  logout: async () => {},
  updateUserPhoto: () => {}, // <- ADICIONADO
});

interface ProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: ProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  // Carrega o usuário salvo no AsyncStorage
  useEffect(() => {
    async function loadUser() {
      const stored = await AsyncStorage.getItem("@user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    }
    loadUser();
  }, []);

  // ============================================================
  // LOGOUT
  // ============================================================
  async function logout() {
    await AsyncStorage.multiRemove(["@user", "@accessToken", "@refreshToken"]);
    setUser(null);
  }

  // ============================================================
  // UPDATE PHOTO
  // ============================================================
  function updateUserPhoto(url: string) {
    if (!user) return;

    const updated = { ...user, photoUrl: url };

    setUser(updated);
    AsyncStorage.setItem("@user", JSON.stringify(updated));
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        updateUserPhoto,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
