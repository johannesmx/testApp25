import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedButton } from "@/components/themed-button";
import { useLocalSearchParams, Link } from "expo-router";
import { AuthContext } from "@/contexts/AuthContext";
import { DataContext } from "@/contexts/DataContext";
import { useContext,useState,useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, type DocumentData } from "firebase/firestore";
import { Item } from "@/interfaces/ItemInterface";


export default function DetailScreen() {
    const [userId,setUserId] = useState<string>('')
    const [document, setDocument ] = useState< undefined | DocumentData>()
    
    const { id }: any = useLocalSearchParams()
    // const { name }: any = useLocalSearchParams()
    // split the id to 
    const docId:string= id.split(".")[0]
    // authentication context
    const auth:any = useContext(AuthContext)
    const db:any = useContext(DataContext)
    
    onAuthStateChanged( auth, (user) => {
        if( user ) {
            setUserId(user.uid )
        }
    })

    const getDocument = async (docId:string) => {
        const ref = doc( db, `userdata/${userId}/trackerdata`, docId )
        const document = await getDoc(ref)
        setDocument(document.data())
    }

    useEffect( () => {
        if( userId && docId ) {
            getDocument(docId)
        }
    }, [userId,docId])

    if( document ) {
    return (<SafeAreaView>
        <ThemedView>
            <Link href="/(tabs)/explore">
                <ThemedText>Back</ThemedText>
            </Link>
            <ThemedText>Detail Screen</ThemedText>
            <ThemedText>{document.name}</ThemedText>
            <ThemedText>{document.description}</ThemedText>
        </ThemedView>
    </SafeAreaView>
    )
    }
    else {
        return null
    }
} 