import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Link } from "expo-router"


export default function TestScreen() {
    return(
        <ThemedView>
            <ThemedText>Test screen</ThemedText>
            <Link href={"../"}>
                <ThemedText>Sign out</ThemedText>
            </Link>
        </ThemedView>
    )
}