import {Pressable, StyleProp, StyleSheet, Text, ViewStyle, TextStyle, type PressableProps, useColorScheme} from 'react-native'

interface ThemedButtonProps extends PressableProps {
    text: string
    style ?: StyleProp<ViewStyle>
}

export function ThemedButton (props:ThemedButtonProps) {
    const scheme = useColorScheme()

    if( scheme == 'dark' ) {
        return (
            <Pressable {...props} style={[ styles.button, styles.buttonDark, props.style ]}>
                <Text style={[styles.text,styles.textDark]}>{ props.text }</Text>
            </Pressable>
        )
    }
    else {
        return (
            <Pressable {...props} style={[ styles.button, styles.buttonLight, props.style ]}>
                <Text style={[styles.text,styles.textLight]}>{ props.text }</Text>
            </Pressable>
        )
    }
}

const styles = StyleSheet.create({
    button : {
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 5,
        padding: 5,
        marginVertical: 5,
    },
    buttonDark: {
        backgroundColor: "#333333",
        borderColor: "#CCCCCC"
    },
    buttonLight: {
        backgroundColor: "#CCCCCC",
        borderColor: "#333333"
    },
    text: {
        fontSize: 16,
        textAlign: "center",
    },
    textDark: {
        color: "#CCCCCC",
    },
    textLight: {
        color: "#333333"
    }
})