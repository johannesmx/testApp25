import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedButton } from "@/components/themed-button";
import { useLocalSearchParams } from "expo-router";

export default function DetailScreen() {
    const {id} = useLocalSearchParams()
    <SafeAreaView>
        <ThemedView>
            <ThemedText>Detail Screen {id}</ThemedText>
        </ThemedView>
    </SafeAreaView>
} 