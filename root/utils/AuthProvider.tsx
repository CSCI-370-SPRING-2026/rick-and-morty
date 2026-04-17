import { AuthContext } from "@/context/context";
import { createUser, loginIn } from "@/database/db";
import { User } from "@/interfaces/interfaces";
import { useState } from "react";

export const AuthProvider = ({ children }) => {
  // establish user state
  const [user, setUser] = useState<User | null>(null);

  // pass the typed email and password to the db
  const login = async (email: string, password: string) => {
    // check if user exists
    const foundUser: User | null = await loginIn(email, password);

    if (foundUser) {
      setUser(foundUser);
      return true;
    } else {
        return false
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
        await createUser(email, password);
        return await login(email, password)
    } catch (e) {
        console.log("signUp, ", e)
        return false
    }
  }
  // make this information now available
  return (
    <AuthContext.Provider value={{user, login, signUp}}>
        {children}
    </AuthContext.Provider>
  )
};
