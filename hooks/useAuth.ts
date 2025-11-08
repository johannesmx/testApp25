import { createContext, useContext, useState, useEffect } from "react"

const AuthenticationContext = createContext(null)

export function useAuthentication() {
    return useContext( AuthenticationContext )
}

export function AuthenticationProvider (props:unknown) {
    const signIn = () {}
    const signUp = () {}
    const signOut = () {}

}