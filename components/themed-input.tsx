import { Appearance, useColorScheme, TextInput, type TextInputProps, StyleSheet, Text } from 'react-native'

export function ThemedInput( props:TextInputProps ) {
    let colorScheme = useColorScheme()
    //console.log( colorScheme )
    if( colorScheme == 'dark' ) {
        return <TextInput  {...props} style={[styles.darkInput]}/>
    }
    else {
        return <TextInput  {...props} style={[styles.lightInput ]}/>
    }
    return (
        <Text>color: {colorScheme}</Text>
    )
}

const styles = StyleSheet.create({
    lightInput: {
        backgroundColor: "#FFFFFF",
        color: "#333333",
        padding: 5,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 10,
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