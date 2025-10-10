import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Link } from "expo-router"

export default function AuthScreen() {
    return (
        <ThemedView>
            <ThemedText>Authenticate</ThemedText>
            <Link href={"/(tabs)"}>
                <ThemedText>Login</ThemedText>
            </Link>
        </ThemedView>
    )
}