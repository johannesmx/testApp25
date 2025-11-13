import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Pressable } from "react-native";
import { Link, useRouter } from "expo-router"
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { signOut } from "firebase/auth";


export default function TestScreen() {
    const router = useRouter()
    const auth:any = useContext(AuthContext)

    const logOut = () => {
        signOut(auth)
        .then(() => {
            router.push("../signin")
        })
    }

    return (
        <ThemedView>
            <ThemedText>Test screen</ThemedText>
            <Pressable onPress={ ()=> logOut() }>
                <ThemedText>Sign out</ThemedText>
            </Pressable>
        </ThemedView>
    )
}