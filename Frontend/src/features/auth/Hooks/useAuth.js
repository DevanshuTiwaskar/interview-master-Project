import { useContext, useEffect } from "react";
import { getMe, login, logout, register } from "../services/auth.api";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    try {
      setLoading(true);
      const data = await login({ email, password });
      if (data && data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.log("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ email, password, username }) => {
    try {
      setLoading(true);
      const data = await register({ email, password, username });
      if (data && data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.log("Error registering:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      setUser(null);
    } catch (error) {
      console.log("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };

// getAndSetUser() → backend se user fetch karke global state me set karta hai.

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data = await getMe();
        if (data && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    getAndSetUser();
  }, [setUser, setLoading]);

  return { user, loading, handleLogin, handleLogout, handleRegister };
};
