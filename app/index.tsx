import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { Link } from "expo-router"
import { View, TextInput, StyleSheet, Pressable } from 'react-native'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from "@/contexts/AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth"

export default function AuthScreen() {
    const [email,setEmail] = useState<string>("")
    const [validEmail,setValidEmail] = useState<boolean>(false)
    const [password,setPassword] = useState<string>("")
    const [validPassword,setValidPassword] = useState<boolean>(false)

    const auth:any = useContext(AuthContext)

    useEffect( () => {
        // check for valid email
        if( email.indexOf('@') > 0 ) {
            setValidEmail(true)
        }
        else {
            setValidEmail(false)
        }
    }, [email])

    useEffect( () => {
        if( password.length >= 8 ) {
            setValidPassword(true)
        }
        else {
            setValidPassword(false)
        }
    }, [password])

    const signUp = () => {
        createUserWithEmailAndPassword(auth,email,password)
        .then((response) =>  console.log(response) )
        .catch((error) => console.log(error) )
    }

    return (
        <ThemedView style={styles.container}>
            <View style={styles.form}>
                <ThemedText style={styles.title} >Sign up for an account</ThemedText>
                <ThemedText>Email</ThemedText>
                <TextInput 
                    style={(validEmail) ? styles.validInput : styles.input} 
                    value={email}
                    onChangeText={ (val) => setEmail(val) }
                />
                <ThemedText>Password</ThemedText>
                <TextInput 
                    style={(validPassword) ? styles.validInput : styles.input} 
                    secureTextEntry={true}
                    value={password}
                    onChangeText={ (val) => setPassword(val) }
                />
                <Pressable 
                    style={(validEmail && validPassword ) ? styles.button : styles.buttonDisabled }
                    disabled={(validEmail && validPassword) ? false : true }
                    onPress={ () => signUp() }
                >
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
    validInput: {
        borderWidth: 2,
        borderColor: "#14e383",
        borderStyle: "solid",
        borderRadius: 5,
        color: "#FFFFFF",
        padding: 5,
        marginBottom: 10,
    },
    button: {
        borderWidth: 2,
        borderColor: "#CCCCCC",
        borderStyle: "solid",
        borderRadius: 5,
        padding: 5,
        marginVertical: 10,
    },
    buttonText: {
        textAlign: "center",
    },
    buttonDisabled: {
        borderWidth: 2,
        borderColor: "#666666",
        borderStyle: "solid",
        borderRadius: 5,
        padding: 5,
        marginVertical: 10,
        opacity: 0.5
    }
})