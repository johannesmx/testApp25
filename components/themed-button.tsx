import { useColorScheme, Pressable, Text, StyleSheet, type PressableProps } from "react-native";

interface ThemedButtonProps extends PressableProps {
    text: string
}

export function ThemedButton( props:ThemedButtonProps) {
    const scheme = useColorScheme()

    if( scheme == 'light' ) {
        return(
            <Pressable {...props} style={[ styles.button, styles.buttonLight ]}>
                <Text style={[ styles.text, styles.textLight ]}>{ props.text }</Text>
            </Pressable>
        )
    }
    else {
        return(
            <Pressable {...props} style={[ styles.button, styles.buttonDark]} >
                <Text style={[ styles.text, styles.textDark ]}>{ props.text }</Text>
            </Pressable>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        padding: 5,
        borderWidth: 2,
        borderStyle: "solid",
    },
    buttonLight: {
        backgroundColor: "#CCCCCC",
        borderColor: "#666666",
    },
    buttonDark: {
        backgroundColor: "#333333",
        borderColor: "#CCCCCC",
    },
    text: {
        fontSize: 14,
        textAlign: "center"
    },
    textLight: {
        color: "#333333",
    },
    textDark: {
        color: "white",
    }
})