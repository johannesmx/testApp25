
import { Platform, StyleSheet, TextInput, Pressable, useColorScheme, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ThemedButton } from '@/components/themed-button';
import { AuthContext } from '@/contexts/AuthContext';
import { DataContext } from '@/contexts/DataContext';
import { useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'
import Ionicons from '@expo/vector-icons/Ionicons';


export default function TabTwoScreen() {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>("")
  const [docName, setDocName] = useState<string>("")
  const [docDesc, setDocDesc] = useState<string>("")
  // modal controller
  // data display
  const [userdata,setUserData] = useState< Item[] >([])
  const [loaded,setLoaded] = useState<boolean>(false)

  const auth: any = useContext(AuthContext)
  const db: any = useContext(DataContext)
  const scheme = useColorScheme()
 

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserId(user.uid)
    }
    else {
      // user is not authenticated
      // navigate to sign in
    }
  })

  interface UserItem {
    name: string
    description: string
  }

  const addData = async (name: string, description: string) => {
    const path = `userdata/${userId}/trackerdata`
    const docId: string = (new Date).getTime().toString()
    await setDoc(doc(db, path, docId), {
      name, description
    })

  }
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={ modalOpen }
        backdropColor={"black"}
        transparent={true}
      >
        <ThemedView>
          <ThemedText>Add data to user's collection</ThemedText>
          <ThemedText>item name</ThemedText>
          <TextInput
            style={
              (scheme == 'dark') ?
                [styles.input, styles.inputDark] :
                [styles.input, styles.inputLight]
            }
            value={docName}
            onChangeText={(value) => setDocName(value)}
          />
          <ThemedText>item description</ThemedText>
          <TextInput
            style={
              (scheme == 'dark') ?
                [styles.input, styles.inputDark] :
                [styles.input, styles.inputLight]
            }
            value={docDesc}
            onChangeText={(value) => setDocDesc(value)}
          />
          <ThemedButton text="Add" onPress={() => { addData(docName, docDesc) }} />
            <ThemedButton text="Cancel" onPress={() => setModalOpen(false) } />
        </ThemedView>
      </Modal>
      <Pressable style={ styles.floatingButton } onPress={() => setModalOpen(true)}>
        <Ionicons name="add" size={40} color={ (scheme == 'dark') ? "white" : "#333333"} />
      </Pressable>

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
  },
  floatingButton: {
    position: "absolute",
    right: 30,
    bottom: 30,
    borderColor: "#CCCCCC",
    borderStyle: "solid",
    borderWidth: 2,
    width: 50,
    height: 50,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
  }
});
