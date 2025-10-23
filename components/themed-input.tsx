import { Appearance, useColorScheme, TextInput, type TextInputProps, StyleSheet } from 'react-native'

export function ThemedInput( props:TextInputProps ) {
    let colorScheme = useColorScheme()

    if( colorScheme == 'dark' ) {
        return <TextInput  {...props}/>
    }
    else {
        return <TextInput  {...props}/>
    }
}

const styles = StyleSheet.create({
    lightInput: {
        backgroundColor: "#FFFFFF",
        color: "#333333",
    },
    darkInput: {
        backgroundColor: "#333333",
        color: "#FFFFFF",
    }
})