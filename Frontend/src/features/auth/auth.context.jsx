import { createContext, useState } from "react";
import { getMe } from "./services/auth.api";


// getAndSetUser() → backend se user fetch karke global state me set karta hai.
// loading = true → jab tak user check nahi hota tab tak app wait karta hai.

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

   const [user, setUser] = useState(null)
   const [loading , setLoading] = useState(true)

   return (
   <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
     {children}
   </AuthContext.Provider>
   )



}


