import { createContext, useContext, useState, useEffect, ContextType } from "react"
import { type User } from 'firebase/auth'

const AuthenticationContext = createContext( null )

export function useAuthentication() {
    return useContext( AuthenticationContext )
}

export function AuthenticationProvider (props:unknown) {
    const [user,setUser] = useState<User | null>()
    const signIn = () => {
        
    }
    const signUp = () => {}
    const signOut = () => {}

}