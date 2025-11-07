
import { Platform, StyleSheet, TextInput,Pressable, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AuthContext } from '@/contexts/AuthContext';
import { DataContext } from '@/contexts/DataContext';
import { useContext, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'


export default function TabTwoScreen() {
  const [userId,setUserId] = useState<string>("")
  const [docName,setDocName] = useState<string>("")
  const [docDesc, setDocDesc] = useState<string>("")

  const scheme = useColorScheme()
  const auth:any = useContext( AuthContext )
  const db:any = useContext( DataContext )

  onAuthStateChanged( auth, (user) => {
    if( user ) {
      setUserId( user.uid )
      console.log( user.uid )
    }
    else {
      // user is not authenticated
    }
  })

  interface UserItem {
    name: string
    description: string
  }
  
  const addData = async ( name:string , description:string ) => {
    const path = `userdata/${userId}/trackerdata`
    const docId:string = ( new Date ).getTime().toString()
    await setDoc( doc( db, path, docId ), {
      name,description
    } )
    console.log("success")
  }
  return (
    <SafeAreaView style={ styles.container }>
      <ThemedView>
        <ThemedText>Add data to user's collection</ThemedText>
        <ThemedText>item name</ThemedText>
        <TextInput 
          style={ 
            (scheme == 'dark') ? 
            [styles.input, styles.inputDark ] : 
            [styles.input, styles.inputLight] 
          }
          value = {docName}
          onChangeText={ (value) => setDocName(value) }
        />
         <ThemedText>item description</ThemedText>
        <TextInput 
          style={ 
            (scheme == 'dark') ?
            [styles.input, styles.inputDark ] :
              [styles.input, styles.inputLight] 
            }
            value = {docDesc}
            onChangeText={ (value) => setDocDesc(value) }
        />
        <Pressable onPress={ () => { addData( docName, docDesc ) } }>
          <ThemedText>Add</ThemedText>
        </Pressable>
      </ThemedView>
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    borderStyle: "solid",
    padding: 5,
    borderWidth: 2,
    borderRadius: 4,
  },
  inputDark: {
    color: "white",
    borderColor: "#CCCCCC",
  },
  inputLight: {
    color: "black",
    borderColor: "#333333",
  }
});
