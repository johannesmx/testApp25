import { createContext } from "react"
import { Firestore } from "firebase/firestore"

export const DataContext = createContext< Firestore | null>(null)