import { ThemedText } from "./themed-text";
import { View } from "react-native";
import { useState,useEffect, type ComponentProps} from 'react'
import { type FirebaseError } from 'firebase/app'

export function ThemedErrorMessage(props:any) {
    const [message,setMesage] = useState<string>('')

    useEffect( () => {

    }, [props.error])
    
    if (props.error) {
        return (
            <View>

            </View>
        )
    }
    else {
        return null
    }
}