import { ThemedView } from "@/components/themed-view"
import { ThemedText } from "@/components/themed-text"
import {  SafeAreaView } from "react-native-safe-area-context"

export default function Signup () {
    return(
        <SafeAreaView>
            <ThemedView>
                <ThemedText>Sign up</ThemedText>
            </ThemedView>
        </SafeAreaView>
    )
}