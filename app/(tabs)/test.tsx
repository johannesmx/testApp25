import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Pressable } from "react-native";
import { Link, useRouter } from "expo-router"


export default function TestScreen() {
    const router = useRouter()
    return (
        <ThemedView>
            <ThemedText>Test screen</ThemedText>
            <Pressable onPress={ ()=> router.dismissAll() }>
                <ThemedText>Sign out</ThemedText>
            </Pressable>
        </ThemedView>
    )
}