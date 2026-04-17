import { User } from "@/interfaces/interfaces"
import { createContext } from "react"

// authorized type
interface AuthContextInterface {
    user: User | null
    login: (email: string, password: string) => Promise<boolean>
    signUp: (email: string, password: string) => Promise<boolean>
   
}

// create context to allow other values to change when the context changes
export const AuthContext = createContext<AuthContextInterface>({
    user: null,
    login: async () => false,
    signUp: async () => false,
    
})