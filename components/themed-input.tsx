import { Appearance, useColorScheme, TextInput, type TextInputProps, StyleSheet } from 'react-native'

export function ThemedInput( props:TextInputProps ) {
    let colorScheme = useColorScheme()
    console.log("input",colorScheme)
    
    if( colorScheme == 'dark' ) {
        return <TextInput  {...props} style={[styles.darkInput,props.style]}/>
    }
    else {
        return <TextInput  {...props} style={[styles.lightInput, props.style ]}/>
    }
}

const styles = StyleSheet.create({
    lightInput: {
        backgroundColor: "#FFFFFF",
        color: "#333333",
        padding: 5,
        borderStyle: "solid",
        borderWidth: 1,
    },
    darkInput: {
        backgroundColor: "#222222",
        color: "#FFFFFF",
        padding: 5,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#CCCCCC",
        borderRadius: 4,
    }
})