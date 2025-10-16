import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Link } from "expo-router"
import { View, TextInput, StyleSheet, Pressable } from 'react-native'
import { useState, useEffect } from 'react'

export default function AuthScreen() {
    return (
        <ThemedView style={styles.container}>
            <View style={styles.form}>
                <ThemedText style={styles.title} >Sign up for an account</ThemedText>
                <ThemedText>Email</ThemedText>
                <TextInput style={styles.input} />
                <ThemedText>Password</ThemedText>
                <TextInput style={styles.input} secureTextEntry={true}/>
                <Pressable style={styles.button }>
                    <ThemedText style={styles.buttonText}>Sign up</ThemedText>
                </Pressable>
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        marginHorizontal: 20,
        marginTop: 50,
    },
    title: {
        textAlign: "center",
        fontSize: 18,
    },
    input: {
        borderWidth: 2,
        borderColor: "#666666",
        borderStyle: "solid",
        borderRadius: 5,
        color: "#FFFFFF",
        padding: 5,
        marginBottom: 10,
    },
    button: {
        borderWidth: 2,
        borderColor: "#666666",
        borderStyle: "solid",
        borderRadius: 5,
        padding: 5,
        marginVertical: 10,
    },
    buttonText: {
        textAlign: "center",
    },
})