import { createContext, useContext, useEffect, useState } from "react";
import { refreshTokenAPI } from "../api/authAPI";

const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [loading, setLoading] = useState(true);

  const login = ({ user, access_token, refresh_token }) => {
    setUser(user);
    setAccessToken(access_token);
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("refreshToken", refresh_token);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  useEffect(() => {
    const initAuth = async () => {
      const refresh_token = localStorage.getItem("refreshToken");
      if (!refresh_token) {
        setLoading(false);
        return;
      }
      try {
        const data = await refreshTokenAPI(refresh_token);
        setUser(data.user);
        setAccessToken(data.access_token);
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("refreshToken", data.refresh_token);
        setUser(data.user);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
